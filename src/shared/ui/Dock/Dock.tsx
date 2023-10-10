import classNames from "classnames";
import { useAppSelector } from "../../../app/store/store";
import {
    getCountOfPlacedUsersShips,
    getUserShips,
} from "../../../app/store/userSlice/userSlice";
import { getScene } from "../../../app/store/gameSlice/gameSlice";
import Ship from "../Ship";
import styles from "./Dock.module.scss";

const Dock = () => {
    const ships = useAppSelector(getUserShips());
    const countOfPlacedShips = useAppSelector(getCountOfPlacedUsersShips());
    const scene = useAppSelector(getScene());

    return (
        <div
            className={classNames(
                styles.container,
                scene !== "arrangement" || countOfPlacedShips === 10
                    ? styles.hidden
                    : null
            )}
            id="dock"
        >
            {(scene === "arrangement" || countOfPlacedShips === 10) &&
                ships &&
                ships.map((el, index) => <Ship key={index} ship={el} />)}
        </div>
    );
};

export default Dock;
