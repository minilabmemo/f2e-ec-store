export function currency(num: string): string {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time: number): string {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}

export interface FilterI {
  currency(num: string): string;
  date(time: number): string;
}

const filters: FilterI = {
  currency,
  date
};

export default filters;
