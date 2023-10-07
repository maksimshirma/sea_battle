import BattleField from "../BattleField";
import RowsNumbering from "../RowsNumbering";
import ColumnsNumbering from "../ColumnsNumbering";
import styles from "./Board.module.scss";

interface IProps {
    position: "left" | "right";
}

const Board = ({ position }: IProps): JSX.Element => {
    const board: number[][] = [];
    for (let i = 0; i < 10; i++) {
        const row: number[] = [];
        for (let j = 0; j < 10; j++) {
            row.push(i * 10 + j + 1);
        }
        board.push(row);
    }
    return (
        <div className={styles.container}>
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
