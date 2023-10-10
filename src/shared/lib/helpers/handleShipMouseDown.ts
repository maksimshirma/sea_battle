import { AppDispatch } from "../../../app/store/store";
import { userActions } from "../../../app/store/userSlice/userSlice";
import { getBoardCoordinates } from "./getBoardCoordinates";

export const handleShipMouseDown = (
    event: React.MouseEvent,
    dispatch: AppDispatch,
    id: number,
    placed: boolean
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
        dispatch(userActions.unplaceUserShip({ id }));
    } else {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("wheel", onWheel, { passive: false });
    }

    function onMouseMove(event: MouseEvent): void {
        shipAbsolute();
        dispatch(
            userActions.changeCoordinates({
                id,
                x: event.clientX - shiftX,
                y: event.clientY - shiftY,
            })
        );
    }

    function onMouseUp(event: MouseEvent): void {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("wheel", onWheel);

        const board = getBoardCoordinates("user-board");
        if (board) {
            const { startX, startY, endX, endY } = board;
            const [x, y] = [event.clientX - shiftX, event.clientY - shiftY];
            if (!(x >= startX && x <= endX && y >= startY && y <= endY)) {
                shipStatic();
                dispatch(userActions.changeDirection({ id, direction: "row" }));
            }
        }

        if (!placed) {
            dispatch(userActions.placeUserShip({ id }));
        }
    }

    function onWheel() {
        dispatch(userActions.changeDirection({ id }));
    }
};
