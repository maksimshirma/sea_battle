import React from "react";
import BattleBlock from "../BattleBlock";
import styles from "./BattleField.module.scss";

interface IProps {
    board: number[][];
}

const BattleField = ({ board }: IProps): JSX.Element => {
    return (
        <div className={styles.container}>
            {board.map((row, i) =>
                row.map((_, j) => (
                    <React.Fragment key={`${i}-${j}`}>
                        <BattleBlock index={[i, j]} />
                    </React.Fragment>
                ))
            )}
        </div>
    );
};

export default BattleField;
