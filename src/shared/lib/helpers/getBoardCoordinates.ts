export const getBoardCoordinates = (): {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    blockSize: number;
} | null => {
    const board = document.getElementById("board") as HTMLDivElement;

    if (board) {
        const startX = board.offsetLeft;
        const startY = board.offsetTop;
        const endX = board.offsetLeft + board.offsetWidth;
        const endY = board.offsetTop + board.offsetHeight;
        const boardSize = board.offsetWidth - 2;
        const blockSize = boardSize / 10;
        return {
            startX,
            startY,
            endX,
            endY,
            blockSize,
        };
    }
    return null;
};
