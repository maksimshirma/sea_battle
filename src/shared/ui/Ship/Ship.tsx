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
    const scene = useAppSelector(gameActions.getScene());
    const dispatch = useAppDispatch();

    return (
        <div
            onMouseDown={
                scene === "firstUserArrangement" ||
                scene === "secondUserArrangement"
                    ? (event) =>
                          handleShipMouseDown(
                              event,
                              dispatch,
                              id,
                              placed,
                              owner
                          )
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
                <div key={index} className={styles.item}></div>
            ))}
        </div>
    );
};

export default Ship;
