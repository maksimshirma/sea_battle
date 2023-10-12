import classNames from "classnames";
import { useAppSelector } from "../../../app/store/store";
import { userActions } from "../../../app/store/userSlice/userSlice";
import { gameActions } from "../../../app/store/gameSlice/gameSlice";
import Ship from "../Ship";
import { IShip } from "../../lib/constants/ship";
import styles from "./Dock.module.scss";

interface IProps {
    owner: "firstUser" | "secondUser";
}

const Dock = ({ owner }: IProps): JSX.Element => {
    const firstUserShips = useAppSelector(
        userActions.getUserShips("firstUser")
    );
    const secondUserShips = useAppSelector(
        userActions.getUserShips("secondUser")
    );
    const countOfPlacedFirstUserShips = useAppSelector(
        userActions.getCountOfPlacedUsersShips("firstUser")
    );
    const countOfPlacedSecondUserShips = useAppSelector(
        userActions.getCountOfPlacedUsersShips("secondUser")
    );

    const scene = useAppSelector(gameActions.getScene());
    const opponent = useAppSelector(gameActions.getOpponent());

    let isDockHidden: boolean;
    let isShipsHidden: boolean;
    let ships: IShip[];

    if (owner === "firstUser") {
        isDockHidden =
            scene !== "firstUserArrangement" ||
            countOfPlacedFirstUserShips === 10;
        isShipsHidden =
            scene === "firstUserArrangement" ||
            (countOfPlacedFirstUserShips === 10 && opponent === "robot");
        ships = firstUserShips;
    } else {
        isDockHidden =
            scene !== "secondUserArrangement" ||
            countOfPlacedSecondUserShips === 10;
        isShipsHidden = scene === "secondUserArrangement";
        ships = secondUserShips;
    }

    return (
        <div
            className={classNames(
                styles.container,
                isDockHidden && styles.hidden
            )}
            id={owner}
        >
            {isShipsHidden &&
                ships &&
                ships.map((el, index) => (
                    <Ship key={index} ship={el} owner={owner} />
                ))}
        </div>
    );
};

export default Dock;
