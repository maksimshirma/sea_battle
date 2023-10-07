import styles from "./BattleBlock.module.scss";

interface IProps {
    value: number;
}

const BattleBlock = ({ value }: IProps): JSX.Element => {
    return (
        <div className={styles.container}>
            <span className={styles.item}>{value}</span>
        </div>
    );
};

export default BattleBlock;
