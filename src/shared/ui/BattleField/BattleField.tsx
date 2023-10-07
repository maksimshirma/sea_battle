import BattleBlock from "../BattleBlock";
import styles from "./BattleField.module.scss";

interface IProps {
    board: number[][];
}

const BattleField = ({ board }: IProps): JSX.Element => {
    return (
        <div className={styles.container}>
            {board.map((row, i) =>
                row.map((element, j) => (
                    <div key={`${i}-${j}`} className={styles.item}>
                        <BattleBlock value={element} />
                    </div>
                ))
            )}
        </div>
    );
};

export default BattleField;
