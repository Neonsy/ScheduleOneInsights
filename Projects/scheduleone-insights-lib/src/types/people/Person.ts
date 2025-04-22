import type { Customer } from '@/types/people/Customer';
import type { Dealer } from '@/types/people/Dealer';

/**
 * Person type - represents either a Customer or a Dealer.
 */
export type Person = Customer | Dealer;
