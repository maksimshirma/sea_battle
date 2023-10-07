import styles from "./Button.module.scss";

interface IProps {
    content: string;
    onClick: () => void;
}

const Button = ({ content, onClick }: IProps): JSX.Element => {
    return (
        <button className={styles.button} onClick={onClick}>
            <span className={styles.content}>{content}</span>
        </button>
    );
};

export default Button;
