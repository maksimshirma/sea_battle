import { getNewIJ } from "./getNewIJ";

export const placeShip = (
    field: number[][],
    coordinates: {
        startI: number;
        startJ: number;
        endI: number;
        endJ: number;
    }
): number[][] => {
    const { newStartI, newStartJ, newEndI, newEndJ } = getNewIJ(coordinates);
    const { startI, endI, startJ, endJ } = coordinates;

    for (let i = newStartI; i <= newEndI; i++) {
        for (let j = newStartJ; j <= newEndJ; j++) {
            if (i >= startI && i <= endI && j >= startJ && j <= endJ) {
                field[i][j] = 1;
            } else {
                field[i][j] = 4;
            }
        }
    }
    return field;
};
