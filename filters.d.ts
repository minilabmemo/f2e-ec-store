// filters.d.ts

declare module '@/utils/methods/filters' {
  export function currency(num: string): string;
  export function date(time: number): string;

  export interface FilterI {
    currency(num: string): string;
    date(time: number): string;
  }

  declare const filters: FilterI;
  export default filters;
}
