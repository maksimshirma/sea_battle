import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return <div className={styles.container}>{children}</div>;
};

export default Layout;
