import RowsNumbering from "../RowsNumbering";
import ColumnsNumbering from "../ColumnsNumbering";
import { useAppSelector } from "../../../app/store/store";
import { getUserField } from "../../../app/store/userSlice/userSlice";
import styles from "./UserBoard.module.scss";
import BattleBlock from "../BattleBlock";

const UserBoard = (): JSX.Element => {
    const userField = useAppSelector(getUserField());

    return (
        <div className={styles.container} id="user-board">
            <div className={styles.board}>
                {userField.map((row, i) =>
                    row.map((value, j) => (
                        <BattleBlock
                            key={`${i}-${j}`}
                            i={i}
                            j={j}
                            who="user"
                            value={value}
                        />
                    ))
                )}
            </div>
            <div className={styles.left_side_bar}>
                <RowsNumbering />
            </div>
            <div className={styles.bottom_side_bar}>
                <ColumnsNumbering />
            </div>
        </div>
    );
};

export default UserBoard;
