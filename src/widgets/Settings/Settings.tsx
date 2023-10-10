import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import Button from "../../shared/ui/Button";
import Icons from "../../shared/ui/Icons";
import Rules from "../../shared/ui/Rules";
import Modal from "../../shared/ui/Modal/Modal";
import { serviceActions } from "../../app/store/serviceSlice/serviceSlice";
import { gameActions } from "../../app/store/gameSlice/gameSlice";
import { userActions } from "../../app/store/userSlice/userSlice";
import { robotActions } from "../../app/store/robotSlice/robotSlice";
import styles from "./Settings.module.scss";

const Settings = (): JSX.Element => {
    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
    const [isResultOpen, setIsResultOpen] = useState<boolean>(false);

    const theme = useAppSelector(serviceActions.getTheme());

    const scene = useAppSelector(gameActions.getScene());
    const userWins = useAppSelector(gameActions.getCountOfUserWins());
    const games = useAppSelector(gameActions.getCountOfGames());
    const countOfPlacedShips = useAppSelector(
        userActions.getCountOfPlacedUsersShips()
    );

    const userScore = useAppSelector(userActions.getUserScore());
    const robotScore = useAppSelector(robotActions.getRobotScore());
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userScore === 0 || robotScore === 0) {
            if (userScore > robotScore) {
                dispatch(gameActions.userWon());
            } else {
                dispatch(gameActions.stopGame());
            }

            setIsResultOpen(true);
        }
    }, [userScore, robotScore]);

    const modalPortal = document.getElementById("modal-portal");

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
                        onClick={() => dispatch(serviceActions.changeTheme())}
                    />
                ) : (
                    <Icons
                        name="moon"
                        margin="10px"
                        onClick={() => dispatch(serviceActions.changeTheme())}
                    />
                )}
                <Icons
                    name="reset"
                    onClick={
                        scene !== "game"
                            ? () => {
                                  dispatch(gameActions.resetSettings());
                                  dispatch(userActions.resetUser());
                                  dispatch(robotActions.resetRobot());
                              }
                            : () => {}
                    }
                />
            </div>
            <div className={styles.buttons}>
                <Button
                    content="По очереди"
                    active={scene === "chooseMode"}
                    onClick={() => dispatch(gameActions.changeMode("oneByOne"))}
                />
                <Button
                    content="До промаха"
                    active={scene === "chooseMode"}
                    onClick={() => dispatch(gameActions.changeMode("toMiss"))}
                />
                <Button
                    content="Лёгкий"
                    active={scene === "chooseDifficulty"}
                    onClick={() =>
                        dispatch(gameActions.changeDifficulty("easy"))
                    }
                />
                <Button
                    content="Средний"
                    active={scene === "chooseDifficulty"}
                    onClick={() =>
                        dispatch(gameActions.changeDifficulty("normal"))
                    }
                />
                <Button
                    content="Сложный"
                    active={scene === "chooseDifficulty"}
                    onClick={() =>
                        dispatch(gameActions.changeDifficulty("hard"))
                    }
                />
                <Button
                    content="Расставить автоматически"
                    active={scene === "chooseArrangement"}
                    onClick={() => {
                        dispatch(userActions.placeUserShips());
                        dispatch(robotActions.placeRobotShips());
                        dispatch(gameActions.arranged());
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
                                  dispatch(robotActions.placeRobotShips());
                                  dispatch(gameActions.manualArrange());
                              }
                            : () => dispatch(gameActions.arranged())
                    }
                />
                <Button
                    content={scene === "game" ? "Закончить" : "Играть"}
                    active={scene === "starting" || scene === "game"}
                    onClick={
                        scene === "game"
                            ? () => dispatch(gameActions.stopGame())
                            : () => dispatch(gameActions.startGame())
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
