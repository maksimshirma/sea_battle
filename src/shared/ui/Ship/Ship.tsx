import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import classNames from "classnames";
import { IShip } from "../../lib/constants/ship";
import { getScene } from "../../../app/store/gameSlice/gameSlice";
import { handleShipMouseDown } from "../../lib/helpers/handleShipMouseDown";
import styles from "./Ship.module.scss";

const Ship = ({ ship }: { ship: IShip }): JSX.Element | null => {
    const { id, placed, size, direction, x, y } = ship;
    const scene = useAppSelector(getScene());
    const dispatch = useAppDispatch();

    return (
        <div
            onMouseDown={
                scene === "arrangement"
                    ? (event) =>
                          handleShipMouseDown(event, dispatch, id, placed)
                    : () => {}
            }
            style={{ left: x, top: y }}
            className={classNames(
                styles.container,
                direction === "row" ? styles.flex : null,
                placed ? styles.absolute : null
            )}
        >
            {new Array(size).fill(0).map((_, index) => (
                <div key={index} data-num={index} className={styles.item}></div>
            ))}
        </div>
    );
};

export default Ship;
