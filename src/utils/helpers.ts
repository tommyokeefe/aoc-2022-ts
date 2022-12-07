export const totalReducer = (total: number, value: number): number => total + value;
export const maxReducer = (max: number, value: number): number => max >= value ? max : value;
export const sortDesc = (a: number, b: number): number => b - a;
export function asReducer<input>(reducerFunction: (param: input) => number): (total: number, item: input) => number {
    return (total: number, item: input) => reducerFunction(item) + total;
}
