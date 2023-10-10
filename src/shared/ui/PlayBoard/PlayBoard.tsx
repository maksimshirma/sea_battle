import { useAppSelector } from "../../../app/store/store";
import { userActions } from "../../../app/store/userSlice/userSlice";
import { robotActions } from "../../../app/store/robotSlice/robotSlice";
import BattleBlock from "../BattleBlock";
import Numbering from "../Numbering";
import styles from "./PlayBoard.module.scss";

interface IProps {
    owner: "user" | "robot";
}

const PlayBoard = ({ owner }: IProps): JSX.Element => {
    const userField = useAppSelector(userActions.getUserField());
    const robotField = useAppSelector(robotActions.getRobotField());

    return (
        <div
            className={styles.container}
            id={owner === "user" ? "user-board" : "robot-board"}
        >
            <div className={styles.board}>
                {(owner === "user" ? userField : robotField).map((row, i) =>
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
                    owner === "user"
                        ? styles.left_side_bar
                        : styles.right_side_bar
                }
            >
                <Numbering position={owner === "user" ? "left" : "right"} />
            </div>
            <div className={styles.bottom_side_bar}>
                <Numbering position="bottom" />
            </div>
        </div>
    );
};

export default PlayBoard;
