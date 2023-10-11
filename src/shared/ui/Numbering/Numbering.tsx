import classNames from "classnames";
import styles from "./Numbering.module.scss";

interface IProps {
    position: "side" | "bottom";
}

const Numbering = ({ position }: IProps): JSX.Element => {
    if (position === "bottom") {
        const cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K"];
        return (
            <div className={styles.bottom}>
                {cols.map((row) => (
                    <span
                        key={row}
                        className={classNames(styles.item, styles.bottom_item)}
                    >
                        {row}
                    </span>
                ))}
            </div>
        );
    }
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className={styles.side}>
            {rows.map((row) => (
                <span
                    key={row}
                    className={classNames(styles.item, styles.side_item)}
                >
                    {row}
                </span>
            ))}
        </div>
    );
};

export default Numbering;
