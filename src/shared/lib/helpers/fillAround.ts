import { getNewIJ } from "./getNewIJ";

export const fillAround = (
    field: number[][],
    i: number,
    j: number
): number[][] => {
    const arr = [[i, j]];
    while (arr.length > 0) {
        const elem = arr.pop()!;
        const [i, j] = elem;
        const { newStartI, newStartJ, newEndI, newEndJ } = getNewIJ({
            startI: i,
            startJ: j,
            endI: i,
            endJ: j,
        });

        for (let ii = newStartI; ii <= newEndI; ii++) {
            for (let jj = newStartJ; jj <= newEndJ; jj++) {
                if (field[ii][jj] === 4) {
                    field[ii][jj] = 3;
                } else if (field[ii][jj] === 2 && ii !== i && jj !== j) {
                    arr.push([ii, jj]);
                }
            }
        }
    }

    return field;
};
