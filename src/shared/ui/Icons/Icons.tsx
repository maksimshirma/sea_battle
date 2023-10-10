import IconsSVG from "./icons.svg";
import styles from "./Icons.module.scss";

interface IProps {
    name: string;
    margin?: string;
    onClick?: () => void;
}

const Icons = ({ name, margin, onClick }: IProps): JSX.Element => {
    return (
        <svg
            style={{ marginRight: margin }}
            className={styles.container}
            onClick={onClick}
        >
            <use xlinkHref={`${IconsSVG}#icon-${name}`} />
        </svg>
    );
};

export default Icons;
