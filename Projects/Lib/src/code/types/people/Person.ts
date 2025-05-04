import type { Customer } from '@/code/types/people/Customer';
import type { Dealer } from '@/code/types/people/Dealer';

/**
 * Person type - represents either a Customer or a Dealer.
 */
export type Person = Customer | Dealer;
