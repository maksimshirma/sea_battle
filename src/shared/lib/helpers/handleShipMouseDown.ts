import { AppDispatch } from "../../../app/store/store";
import { firstUserActions } from "../../../app/store/firstUserSlice/firstUserSlice";
import { secondUserActions } from "../../../app/store/secondUserSlice/secondUserSlice";
import { getBoardCoordinates } from "./getBoardCoordinates";
import { TDirection } from "../constants/ship";
import { TWhooseMove } from "../../../app/store/gameSlice/gameSlice";

export const handleShipMouseDown = (
    event: React.MouseEvent,
    dispatch: AppDispatch,
    id: number,
    placed: boolean,
    owner: Exclude<TWhooseMove, "robot">
): void => {
    event.preventDefault();
    const ship = event.currentTarget as HTMLDivElement;

    const shipStatic = () => {
        ship.style.margin = "5px";
        ship.style.float = "left";
        ship.style.position = "static";
    };

    const shipAbsolute = () => {
        ship.style.margin = "0";
        ship.style.float = "none";
        ship.style.position = "absolute";
    };

    const shiftX =
        event.clientX - event.currentTarget.getBoundingClientRect().left;
    const shiftY =
        event.clientY - event.currentTarget.getBoundingClientRect().top;

    if (placed) {
        shipStatic();
        dispatch(
            owner === "firstUser"
                ? firstUserActions.unplaceUserShip(id)
                : secondUserActions.unplaceUserShip(id)
        );
    } else {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("wheel", onWheel, { passive: false });
    }

    function onMouseMove(event: MouseEvent): void {
        shipAbsolute();
        const data = {
            id,
            x: event.clientX - shiftX,
            y: event.clientY - shiftY,
        };
        dispatch(
            owner === "firstUser"
                ? firstUserActions.changeCoordinates(data)
                : secondUserActions.changeCoordinates(data)
        );
    }

    function onMouseUp(event: MouseEvent): void {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("wheel", onWheel);

        const board = getBoardCoordinates(
            owner === "firstUser" ? "first-user-board" : "second-user-board"
        );

        if (board) {
            const { startX, startY, endX, endY } = board;
            const [x, y] = [event.clientX - shiftX, event.clientY - shiftY];
            if (!(x >= startX && x <= endX && y >= startY && y <= endY)) {
                shipStatic();
                const data = {
                    id,
                    direction: "row" as TDirection,
                };
                dispatch(
                    owner === "firstUser"
                        ? firstUserActions.changeDirection(data)
                        : secondUserActions.changeDirection(data)
                );
            }
        }

        if (!placed) {
            dispatch(
                owner === "firstUser"
                    ? firstUserActions.placeUserShip(id)
                    : secondUserActions.placeUserShip(id)
            );
        }
    }

    function onWheel() {
        dispatch(
            owner === "firstUser"
                ? firstUserActions.changeDirection({ id })
                : secondUserActions.changeDirection({ id })
        );
    }
};
