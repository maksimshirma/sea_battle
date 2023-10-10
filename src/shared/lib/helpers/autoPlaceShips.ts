import { IShip } from "../constants/ship";
import { findPlace } from "./findPlace";
import { getBoardCoordinates } from "./getBoardCoordinates";
import { getRandomBetween } from "./getRandomBetween";
import { placeShip } from "./placeShip";

export const autoPlaceShips = (
    field: number[][],
    ships: IShip[],
    boardId: string
) => {
    const board = getBoardCoordinates(boardId);
    if (board) {
        const { startX: boardX, startY: boardY, blockSize } = board;
        ships.map((ship) => {
            while (!ship.placed) {
                if (!getRandomBetween(0, 1)) {
                    ship.direction = "col";
                }
                const i = getRandomBetween(0, 9);
                const j = getRandomBetween(0, 9);

                ship.x = boardX + i * blockSize;
                ship.y = boardY + j * blockSize;

                const place = findPlace(field, ship, boardId);
                if (place) {
                    const { startI, startJ, endI, endJ, x, y } = place;
                    ship.startI = startI;
                    ship.startJ = startJ;
                    ship.endI = endI;
                    ship.endJ = endJ;
                    ship.x = x;
                    ship.y = y;

                    field = placeShip(field, {
                        startI,
                        startJ,
                        endI,
                        endJ,
                    });

                    ship.placed = true;
                }
            }

            return ship;
        });
    }
    return { field, ships };
};
