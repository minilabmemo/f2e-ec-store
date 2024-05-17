export function currency(num: string | number): string {
  const n = typeof num === 'string' ? parseInt(num, 10) : num;
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time: number): string {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}

export interface FilterI {
  currency(num: string | number): string;
  date(time: number): string;
}

const filters: FilterI = {
  currency,
  date
};

export default filters;
