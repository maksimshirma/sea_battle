import RowsNumbering from "../RowsNumbering";
import ColumnsNumbering from "../ColumnsNumbering";
import { useAppSelector } from "../../../app/store/store";
import { getRobotField } from "../../../app/store/robotSlice/robotSlice";
import BattleBlock from "../BattleBlock";
import styles from "./RobotBoard.module.scss";

const RobotBoard = (): JSX.Element => {
    const robotField = useAppSelector(getRobotField());

    return (
        <div className={styles.container} id="robot-board">
            <div className={styles.board}>
                {robotField.map((row, i) =>
                    row.map((value, j) => (
                        <BattleBlock
                            key={`${i}-${j}`}
                            i={i}
                            j={j}
                            who="robot"
                            value={value}
                        />
                    ))
                )}
            </div>
            <div className={styles.right_side_bar}>
                <RowsNumbering />
            </div>
            <div className={styles.bottom_side_bar}>
                <ColumnsNumbering />
            </div>
        </div>
    );
};

export default RobotBoard;
