import classNames from "classnames";
import { useAppSelector } from "../../../app/store/store";
import { userActions } from "../../../app/store/userSlice/userSlice";
import { gameActions } from "../../../app/store/gameSlice/gameSlice";
import Ship from "../Ship";
import styles from "./Dock.module.scss";

const Dock = (): JSX.Element => {
    const ships = useAppSelector(userActions.getUserShips());
    const countOfPlacedShips = useAppSelector(
        userActions.getCountOfPlacedUsersShips()
    );
    const scene = useAppSelector(gameActions.getScene());

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
