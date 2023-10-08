import classNames from "classnames";
import styles from "./Button.module.scss";

interface IProps {
    content: string;
    active?: boolean;
    onClick: () => void;
}

const Button = ({ content, active = true, onClick }: IProps): JSX.Element => {
    return (
        <button
            className={classNames(
                styles.button,
                !active ? styles.button_inactive : null
            )}
            onClick={active ? onClick : () => {}}
        >
            <span className={styles.content}>{content}</span>
        </button>
    );
};

export default Button;
