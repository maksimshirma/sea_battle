import classNames from "classnames";
import { useAppSelector } from "../../../app/store/store";
import { firstUserActions } from "../../../app/store/firstUserSlice/firstUserSlice";
import { secondUserActions } from "../../../app/store/secondUserSlice/secondUserSlice";
import { gameActions } from "../../../app/store/gameSlice/gameSlice";
import Ship from "../Ship";
import { IShip } from "../../lib/constants/ship";
import styles from "./Dock.module.scss";

interface IProps {
    owner: "firstUser" | "secondUser";
}

const Dock = ({ owner }: IProps): JSX.Element => {
    const firstUserShips = useAppSelector(firstUserActions.getUserShips());
    const secondUserShips = useAppSelector(secondUserActions.getUserShips());
    const countOfPlacedFirstUserShips = useAppSelector(
        firstUserActions.getCountOfPlacedUsersShips()
    );
    const countOfPlacedSecondUserShips = useAppSelector(
        secondUserActions.getCountOfPlacedUsersShips()
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
