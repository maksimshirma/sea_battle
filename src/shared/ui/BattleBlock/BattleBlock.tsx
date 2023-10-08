import styles from "./BattleBlock.module.scss";

interface IProps {
    index: [number, number];
}

const BattleBlock = ({ index }: IProps): JSX.Element => {
    return (
        <div
            className={styles.container}
            data-set-i={index[0]}
            data-set-j={index[1]}
        >
            <span className={styles.item}></span>
        </div>
    );
};

export default BattleBlock;
