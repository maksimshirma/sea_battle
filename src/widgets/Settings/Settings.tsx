import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../shared/ui/Button";
import SelectField from "../../shared/ui/SelectField";
import Icons from "../../shared/ui/Icons";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { getTheme, changeTheme } from "../../app/store/userSlice/userSlice";
import Rules from "../../shared/ui/Rules";
import styles from "./Settings.module.scss";

const Settings = (): JSX.Element => {
    const theme = useAppSelector(getTheme());
    const dispatch = useAppDispatch();

    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

    const toggleTheme = () => {
        dispatch(changeTheme());
    };

    const modalPortal = document.getElementById("modal-portal");

    return (
        <div className={styles.container}>
            {isRulesOpen &&
                modalPortal &&
                createPortal(
                    <Rules onClick={() => setIsRulesOpen(false)} />,
                    modalPortal
                )}
            <div className={styles.icons}>
                <span
                    className={styles.icon}
                    onClick={() => setIsRulesOpen((prev) => !prev)}
                >
                    <Icons name="info" color="#000" />
                </span>
                <span className={styles.icon} onClick={toggleTheme}>
                    {theme === "light" ? (
                        <Icons name="sun" color="none" />
                    ) : (
                        <Icons name="moon" color="none" />
                    )}
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
