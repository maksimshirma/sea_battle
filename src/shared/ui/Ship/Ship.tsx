import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import classNames from "classnames";
import { IShip } from "../../lib/constants/ship";
import {
    TWhooseMove,
    gameActions,
} from "../../../app/store/gameSlice/gameSlice";
import { handleShipMouseDown } from "../../lib/helpers/handleShipMouseDown";
import styles from "./Ship.module.scss";

interface IProps {
    ship: IShip;
    owner: Exclude<TWhooseMove, "robot">;
}

const Ship = ({ ship, owner }: IProps): JSX.Element => {
    const { id, placed, size, direction, x, y } = ship;
    const [coordinates, setCoordinates] = useState({ x, y });
    const scene = useAppSelector(gameActions.getScene());
    const dispatch = useAppDispatch();

    useEffect(() => {
        setCoordinates({ x, y });
    }, [placed, x, y]);

    return (
        <div
            onMouseDown={
                scene === "firstUserArrangement" ||
                scene === "secondUserArrangement"
                    ? (event) =>
                          handleShipMouseDown(
                              event,
                              dispatch,
                              setCoordinates,
                              id,
                              placed,
                              owner
                          )
                    : () => {}
            }
            style={{ left: coordinates.x, top: coordinates.y }}
            className={classNames(
                styles.container,
                direction === "row" ? styles.flex : null,
                placed ? styles.absolute : null
            )}
        >
            {new Array(size).fill(0).map((_, index) => (
                <div key={index} className={styles.item}></div>
            ))}
        </div>
    );
};

export default Ship;
