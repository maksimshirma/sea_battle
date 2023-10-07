import styles from "./BattleBlock.module.scss";

// interface IProps {
//     value: number;
// }

const BattleBlock = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <span className={styles.item}></span>
        </div>
    );
};

export default BattleBlock;
