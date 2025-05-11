import type { Ingredient } from '@/code/types/products/Ingredient';
import { ingredients as allIngredientsData } from '@/code/data/products/ingredients';
import { transformationRules } from '@/code/data/mix/transformationRules';
import type { EffectCode } from '@/code/types/effects/Effect';
import type { TransformationRule } from '@/code/types/mixing/TransformationRule';
import type { ProductCode } from '@/code/types/products/Product';
import { isMarijuanaProduct } from '@/code/types/products/Product';
import { findProductByCode } from '@/code/utils/products/productUtils';

// Helper type for Rule Analysis
interface RuleInfo {
    readonly rule: TransformationRule;
    readonly triggerIngredientCode: string;
}

interface RuleAnalysis {
    readonly rulesProducingEffect: ReadonlyMap<EffectCode, RuleInfo[]>;
}

const allIngredients: ReadonlyArray<Ingredient> = allIngredientsData;

/**
 * Applies transformation rules to a given set of base effects based on the ingredients present.
 * This function mutates the input effects Set.
 * @param currentPathIngredients - The ingredients currently in the mix.
 * @param effects - The Set of effect codes to which transformations will be applied.
 */
function applyTransformations(currentPathIngredients: ReadonlyArray<Ingredient>, effects: Set<EffectCode>): void {
    let rulesAppliedInPass = true;
    while (rulesAppliedInPass) {
        rulesAppliedInPass = false;
        for (const ingredient of currentPathIngredients) {
            const rulesForIngredient = transformationRules[ingredient.code];
            if (rulesForIngredient) {
                for (const rule of rulesForIngredient as ReadonlyArray<TransformationRule>) {
                    const canApplyRule =
                        rule.ifPresent.every((eff) => effects.has(eff)) &&
                        rule.ifNotPresent.every((eff) => !effects.has(eff));

                    if (canApplyRule) {
                        let changedByThisRule = false;
                        for (const oldEffectKey of Object.keys(rule.replace) as EffectCode[]) {
                            const newEffect = rule.replace[oldEffectKey];
                            if (effects.has(oldEffectKey)) {
                                effects.delete(oldEffectKey);
                                if (newEffect !== undefined) {
                                    effects.add(newEffect);
                                }
                                changedByThisRule = true;
                            }
                        }
                        if (changedByThisRule) {
                            rulesAppliedInPass = true;
                        }
                    }
                }
            }
        }
    }
}

/**
 * Calculates the combined effects of a list of ingredients, including transformations.
 * @param currentPathIngredients - The list of ingredients in the current mix.
 * @param effectsMemo - Memoization cache for calculated effects.
 * @param baseEffects - Optional base effects for initial call
 * @returns A Set of EffectCodes representing the final effects.
 */
function calculateCombinedEffects(
    currentPathIngredients: ReadonlyArray<Ingredient>,
    effectsMemo: Map<string, Set<EffectCode>>,
    baseEffects: ReadonlySet<EffectCode> = new Set()
): Set<EffectCode> {
    const memoKey = currentPathIngredients
        .map((ing) => ing.code)
        .sort()
        .join(',');
    if (effectsMemo.has(memoKey) && currentPathIngredients.length > 0) {
        return new Set(effectsMemo.get(memoKey));
    }

    const combinedEffects = new Set<EffectCode>(baseEffects);
    for (const ingredient of currentPathIngredients) {
        combinedEffects.add(ingredient.defaultEffect);
    }
    applyTransformations(currentPathIngredients, combinedEffects);

    if (currentPathIngredients.length > 0) {
        effectsMemo.set(memoKey, new Set(combinedEffects));
    }
    return combinedEffects;
}

// Helper function for the new pruning strategy
function canPotentiallyAchieveAllMissing(
    missingEffects: ReadonlySet<EffectCode>,
    currentCombinedEffects: ReadonlySet<EffectCode>, // Current state of effects to check rule preconditions
    availableIngredients: ReadonlyArray<Ingredient>,
    ruleAnalysis: RuleAnalysis,
    slotsRemaining: number
): boolean {
    console.log('[CPAM_DEBUG] Checking canPotentiallyAchieveAllMissing...');
    console.log(
        '[CPAM_DEBUG] missingEffects:',
        missingEffects,
        'currentCombinedEffects:',
        currentCombinedEffects,
        'slotsRemaining:',
        slotsRemaining
    );

    if (missingEffects.size === 0) {
        console.log('[CPAM_DEBUG] No missing effects, returning true.');
        return true;
    }
    if (missingEffects.size > slotsRemaining) {
        console.log(
            `[CPAM_DEBUG] Missing effects (${missingEffects.size}) > slots remaining (${slotsRemaining}), returning false.`
        );
        return false;
    }

    for (const missingEff of missingEffects) {
        console.log(`[CPAM_DEBUG] Evaluating missingEff: ${missingEff}`);
        let canAchieveThisEffect = false;

        // Check direct default effect from available ingredients
        for (const ing of availableIngredients) {
            if (ing.defaultEffect === missingEff) {
                console.log(`[CPAM_DEBUG] Found direct default effect for ${missingEff} from ingredient ${ing.code}`);
                canAchieveThisEffect = true;
                break;
            }
        }
        if (canAchieveThisEffect) {
            console.log(`[CPAM_DEBUG] ${missingEff} can be achieved directly. Continuing to next missing effect.`);
            continue; // This specific missing effect can be directly obtained
        }
        console.log(`[CPAM_DEBUG] No direct default effect found for ${missingEff}. Checking rules.`);

        // Check if any rule (triggered by an available ingredient) can produce this missing effect
        const producingRulesInfo = ruleAnalysis.rulesProducingEffect.get(missingEff);
        if (producingRulesInfo) {
            console.log(`[CPAM_DEBUG] Found ${producingRulesInfo.length} rules that can produce ${missingEff}.`);
            for (const { rule, triggerIngredientCode } of producingRulesInfo) {
                console.log(
                    `[CPAM_DEBUG]  Checking rule from trigger: ${triggerIngredientCode} for ${missingEff}. Rule:`,
                    rule
                );
                const triggerIngredient = availableIngredients.find((ing) => ing.code === triggerIngredientCode);
                if (triggerIngredient) {
                    console.log(`[CPAM_DEBUG]   Trigger ingredient ${triggerIngredient.code} is available.`);
                    // Stricter precondition check:
                    const ifPresentMet = rule.ifPresent.every((effPrecondition) => {
                        // Check if met by current state or the trigger ingredient's own default effect
                        if (
                            currentCombinedEffects.has(effPrecondition) ||
                            triggerIngredient.defaultEffect === effPrecondition
                        ) {
                            return true;
                        }

                        // --- Start of new lookahead logic for unmet preconditions ---
                        // Option A: Is effPrecondition a default effect of ANY *other* available ingredient?
                        // (excluding the current triggerIngredient to avoid circular dependencies in this simple check)
                        if (
                            availableIngredients.some(
                                (ing) => ing.code !== triggerIngredient.code && ing.defaultEffect === effPrecondition
                            )
                        ) {
                            console.log(
                                `[CPAM_DEBUG]    effPrecondition ${effPrecondition} for rule triggered by ${triggerIngredient.code} can be met by another ingredient's default effect.`
                            );
                            return true;
                        }

                        // Option B: Can effPrecondition be made by another rule whose conditions ARE simple?
                        // (triggered by an ingredient different from the current triggerIngredient)
                        const rulesProducingPrecondition = ruleAnalysis.rulesProducingEffect.get(effPrecondition);
                        if (rulesProducingPrecondition) {
                            for (const {
                                rule: pRule,
                                triggerIngredientCode: pTriggerCode,
                            } of rulesProducingPrecondition) {
                                const pTriggerIng = availableIngredients.find((ing) => ing.code === pTriggerCode);
                                // Ensure it's a different trigger and available
                                if (pTriggerIng && pTriggerIng.code !== triggerIngredient.code) {
                                    const pIfPresentMet = pRule.ifPresent.every(
                                        (pEff) => currentCombinedEffects.has(pEff) || pTriggerIng.defaultEffect === pEff
                                    );
                                    const pIfNotPresentMet = pRule.ifNotPresent.every(
                                        (pEff) => !currentCombinedEffects.has(pEff)
                                    );
                                    if (pIfPresentMet && pIfNotPresentMet) {
                                        console.log(
                                            `[CPAM_DEBUG]    effPrecondition ${effPrecondition} for rule triggered by ${triggerIngredient.code} can be met by rule from ${pTriggerIng.code} producing ${effPrecondition}.`
                                        );
                                        return true; // Yes, this precondition is achievable by a simple one-step rule
                                    }
                                }
                            }
                        }
                        // --- End of new lookahead logic ---

                        // If neither direct, nor Option A, nor Option B, then this effPrecondition is not met by this check
                        console.log(
                            `[CPAM_DEBUG]    ifPresent condition ${effPrecondition} (for rule by ${triggerIngredient.code}) NOT MET by currentCombinedEffects, trigger default ${triggerIngredient.defaultEffect}, or simple one-step lookahead.`
                        );
                        return false;
                    });
                    const ifNotPresentMet = rule.ifNotPresent.every((eff) => {
                        const isNotPresent = !currentCombinedEffects.has(eff);
                        if (!isNotPresent)
                            console.log(
                                `[CPAM_DEBUG]    ifNotPresent condition ${eff} NOT MET (it IS in currentCombinedEffects)`
                            );
                        return isNotPresent;
                    });

                    console.log(
                        `[CPAM_DEBUG]   Rule for ${missingEff} by ${triggerIngredient.code}: ifPresentMet: ${ifPresentMet}, ifNotPresentMet: ${ifNotPresentMet}`
                    );
                    if (ifPresentMet && ifNotPresentMet) {
                        console.log(`[CPAM_DEBUG]   Rule for ${missingEff} by ${triggerIngredient.code} is PLAUSIBLE.`);
                        canAchieveThisEffect = true;
                        break; // Found a plausible rule for this missingEff
                    } else {
                        console.log(
                            `[CPAM_DEBUG]   Rule for ${missingEff} by ${triggerIngredient.code} is NOT plausible.`
                        );
                    }
                } else {
                    console.log(
                        `[CPAM_DEBUG]   Trigger ingredient ${triggerIngredientCode} for rule producing ${missingEff} is NOT in availableIngredients.`
                    );
                }
            }
        } else {
            console.log(`[CPAM_DEBUG] No rules found that produce ${missingEff}.`);
        }

        if (canAchieveThisEffect) {
            console.log(`[CPAM_DEBUG] ${missingEff} can be achieved by rule. Continuing to next missing effect.`);
            continue; // This specific missing effect can be rule-achieved
        }

        console.log(
            `[CPAM_DEBUG] ${missingEff} CANNOT be achieved directly or by any plausible rule. Returning false from canPotentiallyAchieveAllMissing.`
        );
        return false; // This specific missing effect seems unachievable
    }

    console.log(
        '[CPAM_DEBUG] All missing effects have a potential path. Returning true from canPotentiallyAchieveAllMissing.'
    );
    return true; // All missing effects have a potential path
}

/**
 * Recursive DFS helper function to find a combination of ingredients.
 * @param targetEffects - The set of desired effect codes.
 * @param currentPath - The list of ingredients chosen so far.
 * @param currentCombinedEffects - The combined effects of the currentPath.
 * @param availableIngredients - Ingredients not yet used in the currentPath.
 * @param maxDepth - Maximum number of ingredients to use.
 * @param effectsMemo - Memoization cache for calculated effects.
 * @param ruleAnalysis - Rule analysis data for ingredient prioritization.
 * @returns An array of Ingredients if a solution is found, otherwise null.
 */
function dfs(
    targetEffects: ReadonlySet<EffectCode>,
    currentPath: Ingredient[],
    currentCombinedEffects: Set<EffectCode>,
    availableIngredients: ReadonlyArray<Ingredient>,
    maxDepth: number,
    effectsMemo: Map<string, Set<EffectCode>>,
    ruleAnalysis: RuleAnalysis
): Ingredient[] | null {
    if (Array.from(targetEffects).every((eff) => currentCombinedEffects.has(eff))) {
        return [...currentPath];
    }
    if (currentPath.length >= maxDepth) {
        return null;
    }

    const stillMissingEffects = new Set<EffectCode>();
    for (const targetEff of targetEffects) {
        if (!currentCombinedEffects.has(targetEff)) {
            stillMissingEffects.add(targetEff);
        }
    }

    // Pruning: If remaining effects cannot be achieved with remaining ingredients/depth
    if (
        !canPotentiallyAchieveAllMissing(
            stillMissingEffects,
            currentCombinedEffects,
            availableIngredients,
            ruleAnalysis,
            maxDepth - currentPath.length
        )
    ) {
        return null; // Prune this branch
    }

    const tier1Set = new Set<Ingredient>();
    const tier2Set = new Set<Ingredient>();
    for (const ing of availableIngredients) {
        if (stillMissingEffects.has(ing.defaultEffect)) {
            tier1Set.add(ing);
        }
        for (const mEff of stillMissingEffects) {
            const producingRulesInfo = ruleAnalysis.rulesProducingEffect.get(mEff);
            if (producingRulesInfo) {
                for (const { rule: _rule, triggerIngredientCode } of producingRulesInfo) {
                    if (ing.code === triggerIngredientCode) {
                        tier2Set.add(ing);
                        break;
                    }
                    if (_rule.ifPresent.includes(ing.defaultEffect)) {
                        tier2Set.add(ing);
                        break;
                    }
                }
            }
            if (tier2Set.has(ing)) break;
        }
    }

    const tier1Ingredients = Array.from(tier1Set);
    const tier2Ingredients = Array.from(tier2Set).filter((ing) => !tier1Set.has(ing));
    const otherIngredients = availableIngredients.filter((ing) => !tier1Set.has(ing) && !tier2Set.has(ing));
    const ingredientsToTry = [...tier1Ingredients, ...tier2Ingredients, ...otherIngredients];

    for (const nextIngredient of ingredientsToTry) {
        const newPath = [...currentPath, nextIngredient];
        const newAvailableIngredients = availableIngredients.filter((ing) => ing.code !== nextIngredient.code);
        const newCombinedEffects = calculateCombinedEffects(newPath, effectsMemo);

        //Recursive call occurs after pruning check for the next state, which is good.
        const result = dfs(
            targetEffects,
            newPath,
            newCombinedEffects,
            newAvailableIngredients,
            maxDepth,
            effectsMemo,
            ruleAnalysis
        );
        if (result) {
            return result;
        }
    }
    return null;
}

/**
 * Interface for the parameters of the reverseMixByEffect function.
 */
export interface ReverseMixByEffectParams {
    /** The set of effect codes that the final mix must include. */
    readonly targetEffects: ReadonlySet<EffectCode>;
    /** The base product code to use as a starting point. */
    readonly baseProductCode?: ProductCode;
    /** The maximum number of ingredients to consider in a mix. Defaults to 8. */
    readonly maxSearchDepth?: number;
}

function buildRuleAnalysis(): RuleAnalysis {
    const analysis: { rulesProducingEffect: Map<EffectCode, RuleInfo[]> } = {
        rulesProducingEffect: new Map<EffectCode, RuleInfo[]>(),
    };

    for (const triggerCode of Object.keys(transformationRules)) {
        const rules = transformationRules[triggerCode];
        if (rules) {
            for (const rule of rules) {
                const outputEffects = Object.values(rule.replace).filter((eff) => eff !== undefined);
                for (const outputEffect of outputEffects) {
                    if (!analysis.rulesProducingEffect.has(outputEffect)) {
                        analysis.rulesProducingEffect.set(outputEffect, []);
                    }
                    analysis.rulesProducingEffect.get(outputEffect)!.push({ rule, triggerIngredientCode: triggerCode });
                }
            }
        }
    }
    return analysis;
}

/**
 * Attempts to find a combination of ingredients that produces a target set of effects
 * using a rule-guided Depth-First Search. The goal is to find *any* solution quickly.
 * The "guidance" is implicit in how effects are calculated with transformation rules.
 *
 * @param params - Parameters for the search, including targetEffects and optionally maxSearchDepth.
 * @returns An array of Ingredient objects representing the discovered mix,
 *          or null if no solution is found within the given maxDepth.
 *          The order of ingredients in the returned array is the order they were added.
 */
export function reverseMixByEffect(params: ReverseMixByEffectParams): Ingredient[] | null {
    const { targetEffects, baseProductCode, maxSearchDepth = 8 } = params;

    if (targetEffects.size === 0) {
        return [];
    }

    const effectsMemo = new Map<string, Set<EffectCode>>();
    const ruleAnalysisResult = buildRuleAnalysis();

    const initialEffectsSet = new Set<EffectCode>();

    if (baseProductCode) {
        const productResult = findProductByCode(baseProductCode);
        productResult.match(
            (product) => {
                if (isMarijuanaProduct(product) && product.defaultEffect) {
                    initialEffectsSet.add(product.defaultEffect);
                }
            },
            (err) => {
                console.warn(
                    `Base product ${baseProductCode} not found or error: ${err.message}. Starting with no base effects.`
                );
            }
        );
    }

    if (Array.from(targetEffects).every((eff) => initialEffectsSet.has(eff))) {
        return [];
    }

    const result = dfs(
        targetEffects,
        [],
        initialEffectsSet,
        allIngredients,
        maxSearchDepth,
        effectsMemo,
        ruleAnalysisResult
    );

    return result;
}
