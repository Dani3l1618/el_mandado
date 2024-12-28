import { OrderState } from './toggle.model';

export type SortFunction<T> = (products: T[], order: OrderState) => T[];
