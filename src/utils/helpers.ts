// common reducers
export const totalReducer = (total: number, value: number): number => total + value;
export const maxReducer = (max: number, value: number): number => max >= value ? max : value;
export const chunkReducer = <T>(chunkSize: number) => (chunks: T[][], item: T, index: number): T[][] => {
    const chunk = Math.floor(index / chunkSize);
    chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);
    return chunks;
};
export function asReducer<T>(reducerFunction: (param: T) => number): (total: number, item: T) => number {
    return (total: number, item: T) => reducerFunction(item) + total;
}

// sorts
export const sortDesc = (a: number, b: number): number => b - a;

// other utils
export const getUniques = (items: string | string[]): string[] => [...new Set(items)];
