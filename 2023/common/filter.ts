// https://github.com/Dlurak/AdventOfCode/blob/main/helpers/filterOutNan.ts

/**
 * Filters out NaN (Not-a-Number) values from the given list of numbers.
 *
 * @param list - The array of numbers to filter.
 * @returns - A new array containing only non-NaN numbers from the original list.
 *
 * @example
 * const inputList = [1, 2, NaN, 3, 4, NaN, 5];
 * const result = filterOutNaN(inputList);
 * console.log(result); // Output: [1, 2, 3, 4, 5]
 */
export const filterOutNaN = (list: number[]) => list.filter((n) => !isNaN(n));

/**
 * Filters out occurrences of a specific value from an array.
 *
 * @param list - The array to filter.
 * @param val - The value to filter out from the array.
 * @returns - A new array with the specified value removed.
 *
 * @example
 * ```typescript
 * const originalArray = [1, 2, 3, 4, 3, 5];
 * const filteredArray = filterOut(originalArray, 3);
 * // filteredArray is now [1, 2, 4, 5]
 * ```
 *
 * @example
 * ```typescript
 * const words = ["apple", "orange", "banana", "apple"];
 * const filteredWords = filterOut(words, "apple");
 * // filteredWords is now ["orange", "banana"]
 * ```
 */
export const filterOut = <T>(list: T[], val: T) =>
	list.filter((i) => i !== val);

export const allTrue = (values: boolean[]) => {
	for (const val of values) {
		if (!val) {
			return false;
		}
	}
	return true;
}

export const allFalse = (values: boolean[]) => {
	for (const val of values) {
		if (val) {
			return false;
		}
	}
	return true;
}

export const allEqual = (arr: any[]) => arr.every((i) => i === arr[0]);