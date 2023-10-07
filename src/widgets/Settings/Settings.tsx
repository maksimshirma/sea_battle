import Button from "../../shared/ui/Button";
import SelectField from "../../shared/ui/SelectField";
import Icons from "../../shared/ui/Icons";
import styles from "./Settings.module.scss";

const Settings = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.icons}>
                <span className={styles.icon}>
                    <Icons name="info" color="#000" size="30px" />
                </span>
                <span className={styles.icon}>
                    <Icons name="sun" color="none" size="30px" />
                </span>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button}>
                    <SelectField
                        initialValue="Выберите режим"
                        onChange={(v) => console.log(v)}
                        options={[
                            { label: "по очереди", value: "По очереди" },
                            { label: "до промаха", value: "До промоха" },
                        ]}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Лёгкий"
                        onClick={() => console.log("лёгкий")}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Средний"
                        onClick={() => console.log("средний")}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Сложный"
                        onClick={() => console.log("сложный")}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Расставить автоматически"
                        onClick={() => console.log("расставить автоматически")}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Расставить вручную"
                        onClick={() => console.log("расставить вручную")}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Играть"
                        onClick={() => console.log("Играть")}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
