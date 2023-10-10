import { getBoardCoordinates } from "./getBoardCoordinates";

export const getCoordinatesOfShip = (
    x: number,
    y: number,
    size: number,
    direction: "row" | "col"
): {
    startI: number;
    startJ: number;
    endI: number;
    endJ: number;
    boardStartX: number;
    boardStartY: number;
    blockSize: number;
} | null => {
    const board = getBoardCoordinates();

    if (board) {
        const { startX, startY, endX, endY, blockSize } = board;
        if (x >= startX && x <= endX && y >= startY && y <= endY) {
            const startI = Math.abs(Math.ceil((y - startY) / blockSize - 0.5));
            const startJ = Math.abs(Math.ceil((x - startX) / blockSize - 0.5));
            const endI = direction === "row" ? startI : startI + size - 1;
            const endJ = direction === "col" ? startJ : startJ + size - 1;

            return {
                startI,
                startJ,
                endI,
                endJ,
                boardStartX: startX,
                boardStartY: startY,
                blockSize,
            };
        }
        return null;
    }
    return null;
};
