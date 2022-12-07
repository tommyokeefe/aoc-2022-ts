export const totalReducer = (total: number, value: number): number => total + value;
export const maxReducer = (max: number, value: number): number => max >= value ? max : value;
export const toString = (item: number) => item.toString();
export const sortDesc = (a: number, b: number): number => b - a;
