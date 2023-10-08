import styles from "./Ship.module.scss";

interface IProps {
    size: number;
}

const Ship = ({ size }: IProps): JSX.Element => {
    new Array(size);
    return <div className={styles.container}></div>;
};

export default Ship;
