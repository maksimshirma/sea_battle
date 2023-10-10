import { IShip } from "../constants/ship";
import { getCoordinatesOfShip } from "./getCoordinatesOfShip";

export const findPlace = (
    field: number[][],
    ship: IShip,
    boardId: string
): {
    startI: number;
    startJ: number;
    endI: number;
    endJ: number;
    x: number;
    y: number;
} | null => {
    const { size, direction, x, y } = ship;
    const result = getCoordinatesOfShip(x, y, size, direction, boardId);
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

        const newX = boardStartX + startJ * blockSize + 1;
        const newY = boardStartY + startI * blockSize + 1;
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
