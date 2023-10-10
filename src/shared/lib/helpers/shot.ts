import { IShip } from "./../constants/ship";
import { getNewIJ } from "./getNewIJ";

export const shot = (
    field: number[][],
    ships: IShip[],
    i: number,
    j: number
): { field: number[][]; ships: IShip[] } => {
    const index = ships.findIndex((ship) => {
        const { startI, startJ, endI, endJ } = ship;
        return i >= startI! && i <= endI! && j >= startJ! && j <= endJ!;
    });
    const ship = ships[index];

    if (ship) {
        if (!ship.shots) {
            ship.shots = 0;
        }
        ship.shots += 1;
        if (ship.size === ship.shots) {
            const { startI, startJ, endI, endJ } = ship;
            if (
                startI !== undefined &&
                startJ !== undefined &&
                endI !== undefined &&
                endJ !== undefined
            ) {
                const { newStartI, newStartJ, newEndI, newEndJ } = getNewIJ({
                    startI,
                    startJ,
                    endI,
                    endJ,
                });

                for (let ii = newStartI; ii <= newEndI; ii++) {
                    for (let jj = newStartJ; jj <= newEndJ; jj++) {
                        if (field[ii][jj] !== 2) {
                            field[ii][jj] = 3;
                        }
                    }
                }
            }
        }
        field[i][j] = 2;
        ships[index] = ship;
        return { field, ships };
    }
    field[i][j] = 3;
    return { field, ships };
};
