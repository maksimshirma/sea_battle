import styles from "./ColumnsNumbering.module.scss";

const ColumnsNumbering = (): JSX.Element => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K"];

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

export default ColumnsNumbering;
