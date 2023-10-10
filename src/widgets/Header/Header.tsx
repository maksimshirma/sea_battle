import styles from "./Header.module.scss";

const Header = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>Морской бой</div>
        </div>
    );
};

export default Header;
