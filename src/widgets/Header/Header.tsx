import SelectField from "../../shared/ui/SelectField";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>Морской бой</div>
            <div className={styles.mode}>
                <SelectField
                    name="select"
                    onChange={console.log}
                    options={[
                        { label: "по очереди", value: "по очереди" },
                        { label: "до промаха", value: "до промоха" },
                    ]}
                />
            </div>
        </div>
    );
};

export default Header;
