import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../shared/ui/Button";
import SelectField from "../../shared/ui/SelectField";
import Icons from "../../shared/ui/Icons";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { getTheme, changeTheme } from "../../app/store/userSlice/userSlice";
import Rules from "../../shared/ui/Rules";
import {
    changeDifficulty,
    changeMode,
    getIsGameGoing,
    startGame,
    stopGame,
} from "../../app/store/gameSlice/gameSlice";
import styles from "./Settings.module.scss";

const Settings = (): JSX.Element => {
    const theme = useAppSelector(getTheme());
    const isGameGoing = useAppSelector(getIsGameGoing());
    const dispatch = useAppDispatch();

    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

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
                <span
                    className={styles.icon}
                    onClick={() => dispatch(changeTheme())}
                >
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
                        initialValue={{
                            label: "oneByOne",
                            value: "По очереди",
                        }}
                        onChange={(option) =>
                            dispatch(changeMode(option.label))
                        }
                        options={[
                            { label: "oneByOne", value: "По очереди" },
                            { label: "toMiss", value: "До промоха" },
                        ]}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Лёгкий"
                        onClick={() => dispatch(changeDifficulty("easy"))}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Средний"
                        onClick={() => dispatch(changeDifficulty("normal"))}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        content="Сложный"
                        onClick={() => dispatch(changeDifficulty("hard"))}
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
                    {isGameGoing ? (
                        <Button
                            content="Закончить"
                            onClick={() => dispatch(stopGame())}
                        />
                    ) : (
                        <Button
                            content="Играть"
                            onClick={() => dispatch(startGame())}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
