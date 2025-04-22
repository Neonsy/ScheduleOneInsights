import type { Customer } from '@/lib/types/people/Customer';
import type { Dealer } from '@/lib/types/people/Dealer';

/**
 * Person type - represents either a Customer or a Dealer.
 */
export type Person = Customer | Dealer;
