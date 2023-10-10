import { IShip } from "../constants/ship";
import { getCoordinatesOfShip } from "./getCoordinatesOfShip";

export const findPlace = (
    field: number[][],
    ship: IShip
): {
    startI: number;
    startJ: number;
    endI: number;
    endJ: number;
    x: number;
    y: number;
} | null => {
    const { size, direction, x, y } = ship;
    const result = getCoordinatesOfShip(x, y, size, direction);
    if (result) {
        const {
            startI,
            startJ,
            endI,
            endJ,
            boardStartX,
            boardStartY,
            blockSize,
        } = result;

        for (let i = startI; i <= endI; i++) {
            for (let j = startJ; j <= endJ; j++) {
                if (field[i][j] !== 0) return null;
            }
        }

        const newX = boardStartX + startJ * blockSize;
        const newY = boardStartY + startI * blockSize;
        return {
            startI,
            startJ,
            endI,
            endJ,
            x: newX,
            y: newY,
        };
    }
    return null;
};
