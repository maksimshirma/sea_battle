import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../../shared/ui/Button";
import Icons from "../../shared/ui/Icons";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import {
    getTheme,
    changeTheme,
} from "../../app/store/serviceSlice/serviceSlice";
import Modal from "../../shared/ui/Modal/Modal";
import {
    arranged,
    changeDifficulty,
    changeMode,
    getCountOfGames,
    getCountOfUserWins,
    getScene,
    manualArrange,
    resetSettings,
    startGame,
    stopGame,
    userWon,
} from "../../app/store/gameSlice/gameSlice";
import {
    getCountOfPlacedUsersShips,
    getUserScore,
    placeUserShips,
    resetUser,
} from "../../app/store/userSlice/userSlice";
import {
    getRobotScore,
    placeRobotShips,
    resetRobot,
} from "../../app/store/robotSlice/robotSlice";
import Rules from "../../shared/ui/Rules";
import styles from "./Settings.module.scss";

const Settings = (): JSX.Element => {
    const theme = useAppSelector(getTheme());
    const scene = useAppSelector(getScene());
    const countOfPlacedShips = useAppSelector(getCountOfPlacedUsersShips());
    const userWins = useAppSelector(getCountOfUserWins());
    const games = useAppSelector(getCountOfGames());
    const userScore = useAppSelector(getUserScore());
    const robotScore = useAppSelector(getRobotScore());
    const dispatch = useAppDispatch();

    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
    const [isResultOpen, setIsResultOpen] = useState<boolean>(false);

    const modalPortal = document.getElementById("modal-portal");

    useEffect(() => {
        if (userScore === 0 || robotScore === 0) {
            if (userScore > robotScore) {
                dispatch(userWon());
            } else {
                dispatch(stopGame());
            }

            setIsResultOpen(true);
        }
    }, [userScore, robotScore]);

    return (
        <div className={styles.container}>
            {isResultOpen &&
                modalPortal &&
                createPortal(
                    <Modal
                        header="Игра окончена"
                        onClick={() => setIsResultOpen(false)}
                    />,
                    modalPortal
                )}
            {isRulesOpen &&
                modalPortal &&
                createPortal(
                    <Modal
                        header="Правила"
                        onClick={() => setIsRulesOpen(false)}
                    >
                        <Rules />
                    </Modal>,
                    modalPortal
                )}
            <div className={styles.icons}>
                <Icons
                    name="info"
                    margin="10px"
                    onClick={() => setIsRulesOpen((prev) => !prev)}
                />
                {theme === "light" ? (
                    <Icons
                        name="sun"
                        margin="10px"
                        onClick={() => dispatch(changeTheme())}
                    />
                ) : (
                    <Icons
                        name="moon"
                        margin="10px"
                        onClick={() => dispatch(changeTheme())}
                    />
                )}
                <Icons
                    name="reset"
                    onClick={
                        scene !== "game"
                            ? () => {
                                  dispatch(resetSettings());
                                  dispatch(resetUser());
                                  dispatch(resetRobot());
                              }
                            : () => {}
                    }
                />
            </div>
            <div className={styles.buttons}>
                <Button
                    content="По очереди"
                    active={scene === "chooseMode"}
                    onClick={() => dispatch(changeMode("oneByOne"))}
                />
                <Button
                    content="До промаха"
                    active={scene === "chooseMode"}
                    onClick={() => dispatch(changeMode("toMiss"))}
                />
                <Button
                    content="Лёгкий"
                    active={scene === "chooseDifficulty"}
                    onClick={() => dispatch(changeDifficulty("easy"))}
                />
                <Button
                    content="Средний"
                    active={scene === "chooseDifficulty"}
                    onClick={() => dispatch(changeDifficulty("normal"))}
                />
                <Button
                    content="Сложный"
                    active={scene === "chooseDifficulty"}
                    onClick={() => dispatch(changeDifficulty("hard"))}
                />
                <Button
                    content="Расставить автоматически"
                    active={scene === "chooseArrangement"}
                    onClick={() => {
                        dispatch(placeUserShips());
                        dispatch(placeRobotShips());
                        dispatch(arranged());
                    }}
                />
                <Button
                    content={
                        scene === "arrangement"
                            ? "Принять"
                            : "Расставить вручную"
                    }
                    active={
                        scene === "chooseArrangement" ||
                        (scene === "arrangement" && countOfPlacedShips === 10)
                    }
                    onClick={
                        scene === "chooseArrangement"
                            ? () => {
                                  dispatch(placeRobotShips());
                                  dispatch(manualArrange());
                              }
                            : () => dispatch(arranged())
                    }
                />
                <Button
                    content={scene === "game" ? "Закончить" : "Играть"}
                    active={scene === "starting" || scene === "game"}
                    onClick={
                        scene === "game"
                            ? () => dispatch(stopGame())
                            : () => dispatch(startGame())
                    }
                />
            </div>
            <div className={styles.info}>
                <div className={styles.user}>Всего игр: {games}</div>
                <div className={styles.score}>
                    Счёт: {userWins}:{games - userWins}
                </div>
            </div>
        </div>
    );
};

export default Settings;
