import BattleField from "../BattleField";
import RowsNumbering from "../RowsNumbering";
import ColumnsNumbering from "../ColumnsNumbering";
import { useAppSelector } from "../../../app/store/store";
import { getUserField } from "../../../app/store/userSlice/userSlice";
import styles from "./Board.module.scss";

interface IProps {
    position: "left" | "right";
}

const Board = ({ position }: IProps): JSX.Element => {
    const board = useAppSelector(getUserField());

    return (
        <div className={styles.container} id="board">
            <div className={styles.board}>
                <BattleField board={board} />
            </div>
            <div
                className={
                    position === "left"
                        ? styles.left_side_bar
                        : styles.right_side_bar
                }
            >
                <RowsNumbering />
            </div>
            <div className={styles.bottom_side_bar}>
                <ColumnsNumbering />
            </div>
        </div>
    );
};

export default Board;
