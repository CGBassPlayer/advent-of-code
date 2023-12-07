export const toNumberArray = (list: string[]) => list.map((n) => parseInt(n));
export const toStringArray = (list: number[]) => list.map((s) => '' + s);
export const generateNumberArray = (start: number, length: number) => Array.from({length:length}, (_, i) => i++);
export const generateStringNumberArray = (start: number, length: number) => Array.from({length:length}, (_, i) => i++).map(String);