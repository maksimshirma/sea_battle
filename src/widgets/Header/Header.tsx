import styles from "./Header.module.scss";

const Header = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Морячки</h1>
        </div>
    );
};

export default Header;
