import { IShip } from "../constants/ship";
import { getNewIJ } from "./getNewIJ";

export const setNotAvailableBlocks = (
    field: number[][],
    ships: IShip[]
): number[][] => {
    ships.forEach((ship) => {
        const { startI, startJ, size, direction } = ship;
        if (startI && startJ) {
            const endI = direction === "row" ? startI : startI + size - 1;
            const endJ = direction === "col" ? startJ : startJ + size - 1;

            const { newStartI, newStartJ, newEndI, newEndJ } = getNewIJ({
                startI,
                startJ,
                endI,
                endJ,
            });

            for (let i = newStartI; i <= newEndI; i++) {
                for (let j = newStartJ; j <= newEndJ; j++) {
                    field[i][j] = 4;
                }
            }
        }
    });
    return field;
};
