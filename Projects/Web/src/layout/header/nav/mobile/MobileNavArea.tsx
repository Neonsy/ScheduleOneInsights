'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/shadcn/accordion';
import { siteLinks } from '@/lib/navigation/links';
import { NavItem, NavSubItem } from '@/types/navigation';
import Link from 'next/link';
import { AnimatePresence, motion, LayoutGroup } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MobileAccountArea from '@/layout/header/nav/mobile/MobileAccountArea';

interface MobileNavAreaProps {
    readonly open: boolean;
    readonly onOpenChange: (open: boolean) => void;
}

export default function MobileNavArea({ open, onOpenChange }: MobileNavAreaProps) {
    const [mounted, setMounted] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Focus trap for accessibility
    useEffect(() => {
        if (open && drawerRef.current) {
            drawerRef.current.focus();
        }
    }, [open]);

    if (!mounted) return null;

    // Split sections for rendering
    const sectionsWithSubPaths = siteLinks.mainNav.filter(
        (section: NavItem) => section.subPaths && section.subPaths.length > 0
    );
    const sectionsWithoutSubPaths = siteLinks.mainNav.filter(
        (section: NavItem) => !section.subPaths || section.subPaths.length === 0
    );

    return createPortal(
        <>
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay fade animation */}
                        <motion.div
                            key='mobile-nav-overlay'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className='fixed inset-0 z-50 bg-black/40 backdrop-blur-lg'
                            onClick={() => onOpenChange(false)}
                            aria-label='Close mobile navigation overlay'
                        />
                        {/* Drawer slide animation */}
                        <motion.div
                            key='mobile-nav-drawer'
                            ref={drawerRef}
                            tabIndex={-1}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
                            className='text-text-primary fixed top-0 right-0 z-50 flex h-svh min-h-0 w-[50vw] flex-col border-l-0 bg-slate-900/80 pt-0 shadow-2xl backdrop-blur-lg outline-none md:hidden'
                            role='dialog'
                            aria-modal='true'>
                            {/* X Close Button absolutely positioned and vertically centered */}
                            <div className='mb-6 flex w-full items-center justify-end pt-4 pr-[0.1rem]'>
                                <button
                                    type='button'
                                    onClick={() => onOpenChange(false)}
                                    className='flex items-center justify-center rounded-full p-2 hover:bg-slate-800'
                                    aria-label='Close navigation menu'>
                                    <X className='h-5 w-5 text-slate-300' />
                                </button>
                            </div>
                            <span className='sr-only'>Mobile Navigation Menu</span>
                            <div className='clamp-[px,1,2] min-h-0 flex-1 space-y-2 overflow-y-auto'>
                                <LayoutGroup>
                                    {/* Render sections without subPaths as links or headings */}
                                    {sectionsWithoutSubPaths.map((section: NavItem) =>
                                        section.href ? (
                                            <Link
                                                key={section.name}
                                                href={section.href}
                                                onClick={() => onOpenChange(false)}
                                                className='clamp-[py,2,3] clamp-[px,2,3] hover:bg-primary/20 hover:text-primary clamp-[text,xl,2xl] block rounded-md font-semibold transition-colors'>
                                                {section.name}
                                            </Link>
                                        ) : (
                                            <h3
                                                key={section.name}
                                                className='clamp-[py,2,3] clamp-[px,2,3] clamp-[text,xl,2xl] font-semibold'>
                                                {section.name}
                                            </h3>
                                        )
                                    )}
                                    {/* Accordion for sections with subPaths */}
                                    {sectionsWithSubPaths.length > 0 && (
                                        <Accordion
                                            type='single'
                                            collapsible
                                            value={openAccordion ?? undefined}
                                            onValueChange={setOpenAccordion}
                                            className='w-full'>
                                            {sectionsWithSubPaths.map((section: NavItem) => (
                                                <AccordionItem
                                                    value={section.name}
                                                    key={section.name}
                                                    className='border-b-0'>
                                                    <AccordionTrigger className='clamp-[py,2,3] clamp-[px,2,3] clamp-[text,xl,2xl] flex w-full items-center justify-between gap-x-2 rounded-md font-semibold transition-colors hover:no-underline'>
                                                        <span className='pl-2'>{section.name}</span>
                                                    </AccordionTrigger>
                                                    <AccordionContent className='clamp-[mt,1,2] pb-1'>
                                                        <ul className='clamp-[pl,4,5] flex flex-col space-y-1'>
                                                            {section.subPaths?.map((item: NavSubItem) => (
                                                                <li key={item.name}>
                                                                    <Link
                                                                        href={item.href}
                                                                        onClick={() => onOpenChange(false)}
                                                                        className='clamp-[py,1.5,2] clamp-[px,2,3] clamp-[text,lg,xl] block rounded-md text-slate-300 transition-colors'>
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    )}
                                </LayoutGroup>
                            </div>
                            <div className='clamp-[mt,4,6] clamp-[pt,4,6] clamp-[px,1,2] clamp-[py,3,4] shrink-0 border-t border-slate-800'>
                                <MobileAccountArea closeMobileNav={() => onOpenChange(false)} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>,
        document.body
    );
}
