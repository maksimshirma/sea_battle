import { AppDispatch } from "../../../app/store/store";
import { userActions } from "../../../app/store/userSlice/userSlice";
import { getBoardCoordinates } from "./getBoardCoordinates";
import { TDirection } from "../constants/ship";
import { TWhooseMove } from "../../../app/store/gameSlice/gameSlice";

export const handleShipMouseDown = (
    event: React.MouseEvent,
    dispatch: AppDispatch,
    setCoordinates: ({ x, y }: { x: number; y: number }) => void,
    id: number,
    placed: boolean,
    owner: Exclude<TWhooseMove, "robot">
): void => {
    event.preventDefault();
    const ship = event.currentTarget as HTMLDivElement;

    const shipStatic = () => {
        ship.style.removeProperty("margin");
        ship.style.removeProperty("float");
        ship.style.removeProperty("position");
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
                ? userActions.unplaceUserShip({ person: "firstUser", id })
                : userActions.unplaceUserShip({ person: "secondUser", id })
        );
    } else {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("wheel", onWheel, { passive: false });
    }

    function onMouseMove(event: MouseEvent): void {
        shipAbsolute();
        setCoordinates({
            x: event.clientX - shiftX,
            y: event.clientY - shiftY,
        });
    }

    function onMouseUp(event: MouseEvent): void {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("wheel", onWheel);

        const data = {
            id,
            x: event.clientX - shiftX,
            y: event.clientY - shiftY,
        };
        dispatch(
            owner === "firstUser"
                ? userActions.changeCoordinates({
                      person: "firstUser",
                      ...data,
                  })
                : userActions.changeCoordinates({
                      person: "secondUser",
                      ...data,
                  })
        );

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
                        ? userActions.changeDirection({
                              person: "firstUser",
                              ...data,
                          })
                        : userActions.changeDirection({
                              person: "secondUser",
                              ...data,
                          })
                );
            }
        }

        if (!placed) {
            dispatch(
                owner === "firstUser"
                    ? userActions.placeUserShip({ person: "firstUser", id })
                    : userActions.placeUserShip({
                          person: "secondUser",
                          id,
                      })
            );
        }
    }

    function onWheel() {
        dispatch(
            owner === "firstUser"
                ? userActions.changeDirection({ person: "firstUser", id })
                : userActions.changeDirection({ person: "secondUser", id })
        );
    }
};
