import styles from "./RowsNumbering.module.scss";

const RowsNumbering = (): JSX.Element => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={styles.container}>
            {rows.map((row) => (
                <span key={row} className={styles.item}>
                    {row}
                </span>
            ))}
        </div>
    );
};

export default RowsNumbering;
