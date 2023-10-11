import Button from "../Button";
import styles from "./Modal.module.scss";

interface IProps {
    children?: React.ReactNode;
    header: string;
    onClick: () => void;
}

const Modal = ({ children, header, onClick }: IProps): JSX.Element => {
    return (
        <div className={styles.modal}>
            <div className={styles.header}>{header}</div>
            <div className={styles.content}>{children}</div>
            <div className={styles.footer}>
                <Button content="Закрыть" onClick={onClick} />
            </div>
        </div>
    );
};

export default Modal;
