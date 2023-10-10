import { IShip } from "../constants/ship";

export const initializeShipCoordinates = (ships: IShip[]): IShip[] => {
    const dock = document.getElementById("dock") as HTMLDivElement;
    const board = document.getElementById("board") as HTMLDivElement;
    if (dock && board) {
        const dockX = dock.offsetLeft + 2;
        const dockY = dock.offsetTop + 2;
        console.log(dockX);
        console.log(board.offsetLeft);
        // const dockWidth = dock.offsetWidth;
        // const dockHeight = dock.offsetHeight;
        const blockSize = (board.offsetWidth - 2) / 10;

        return ships.map((ship, index) => {
            // const { size } = ship;
            if (index <= 1) {
                return {
                    ...ship,
                    x: dockX,
                    y: dockY,
                };
            }
            if (index <= 4) {
                return {
                    ...ship,
                    x: dockX,
                    y: dockY + blockSize + blockSize * 0.3,
                };
            }
            return {
                ...ship,
                x: dockX,
                y: dockY + 2 * blockSize + 2 * blockSize * 0.3,
            };
        });
    }
    return ships;
};
