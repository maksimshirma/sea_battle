import { IShip } from "../constants/ship";
import { getCoordinatesOfShip } from "./getCoordinatesOfShip";
import { getNewIJ } from "./getNewIJ";

export const unplaceShip = (
    field: number[][],
    ship: IShip,
    boardId: "first-user-board" | "second-user-board"
): number[][] => {
    const { size, direction, x, y } = ship;
    const result = getCoordinatesOfShip(x, y, size, direction, boardId);
    if (result) {
        const { newStartI, newStartJ, newEndI, newEndJ } = getNewIJ(result);

        for (let i = newStartI; i <= newEndI; i++) {
            for (let j = newStartJ; j <= newEndJ; j++) {
                field[i][j] = 0;
            }
        }
    }
    return field;
};
