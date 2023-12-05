export const sumOfArray = (list: number[]) => {
    let total: number = 0;
    list.forEach((i) => total += i);
    return total;
}