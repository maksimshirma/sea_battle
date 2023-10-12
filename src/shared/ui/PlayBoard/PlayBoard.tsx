import { useAppSelector } from "../../../app/store/store";
import { userActions } from "../../../app/store/userSlice/userSlice";
import { robotActions } from "../../../app/store/robotSlice/robotSlice";
import BattleBlock from "../BattleBlock";
import Numbering from "../Numbering";
import { TWhooseMove } from "../../../app/store/gameSlice/gameSlice";
import styles from "./PlayBoard.module.scss";

interface IProps {
    owner: TWhooseMove;
}

const PlayBoard = ({ owner }: IProps): JSX.Element => {
    const firstUserField = useAppSelector(
        userActions.getUserField("firstUser")
    );
    const secondUserField = useAppSelector(
        userActions.getUserField("secondUser")
    );
    const robotField = useAppSelector(robotActions.getRobotField());

    const getId = () => {
        if (owner === "firstUser") {
            return "first-user-board";
        }
        if (owner === "secondUser") {
            return "second-user-board";
        }
        return "robot-board";
    };

    const getField = () => {
        if (owner === "firstUser") {
            return firstUserField;
        }
        if (owner === "secondUser") {
            return secondUserField;
        }
        return robotField;
    };

    return (
        <div className={styles.container} id={getId()}>
            <div className={styles.board}>
                {getField().map((row, i) =>
                    row.map((value, j) => (
                        <BattleBlock
                            key={`${i}-${j}`}
                            i={i}
                            j={j}
                            owner={owner}
                            value={value}
                        />
                    ))
                )}
            </div>
            <div
                className={
                    owner === "firstUser"
                        ? styles.left_side_bar
                        : styles.right_side_bar
                }
            >
                <Numbering position="side" />
            </div>
            <div className={styles.bottom_side_bar}>
                <Numbering position="bottom" />
            </div>
        </div>
    );
};

export default PlayBoard;
