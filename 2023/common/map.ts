export const toNumberArray = (list: string[]) => list.map((n) => parseInt(n));
export const toStringArray = (list: number[]) => list.map((s) => '' + s);