import IconsSVG from "./icons.svg";
import styles from "./Icons.module.scss";

interface IProps {
    name: string;
    color: string;
}

function Icons({ name, color }: IProps) {
    return (
        <svg fill={color} stroke={color} className={styles.container}>
            <use xlinkHref={`${IconsSVG}#icon-${name}`} />
        </svg>
    );
}

export default Icons;
