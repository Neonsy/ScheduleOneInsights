import type { Customer } from '@/types/Customer';
import type { Dealer } from '@/types/Dealer';

/**
 * Person type - represents either a Customer or a Dealer.
 */
export type Person = Customer | Dealer;
