import { IShip } from "../constants/ship";

export const setNotAvailableBlocks = (
    field: number[][],
    ships: IShip[]
): number[][] => {
    ships.forEach((ship) => {
        const { startI, startJ, size, direction } = ship;
        if (startI && startJ) {
            const endI = direction === "row" ? startI : startI + size - 1;
            const endJ = direction === "col" ? startJ : startJ + size - 1;

            let newStartI = startI;
            let newStartJ = startJ;
            let newEndI = endI;
            let newEndJ = endJ;

            if (startI > 0) newStartI -= 1;
            if (startJ > 0) newStartJ -= 1;
            if (endI < 9) newEndI += 1;
            if (endJ < 9) newEndJ += 1;
            for (let i = newStartI; i <= newEndI; i++) {
                for (let j = newStartJ; j <= newEndJ; j++) {
                    field[i][j] = 4;
                }
            }
        }
    });
    return field;
};
