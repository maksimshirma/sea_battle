import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import Button from "../../shared/ui/Button";
import Modal from "../../shared/ui/Modal/Modal";
import Result from "../../shared/ui/Result";
import { gameActions } from "../../app/store/gameSlice/gameSlice";
import { firstUserActions } from "../../app/store/firstUserSlice/firstUserSlice";
import { secondUserActions } from "../../app/store/secondUserSlice/secondUserSlice";
import { robotActions } from "../../app/store/robotSlice/robotSlice";
import styles from "./Settings.module.scss";

const Settings = (): JSX.Element => {
    const [isResultOpen, setIsResultOpen] = useState<boolean>(false);

    const scene = useAppSelector(gameActions.getScene());
    const opponent = useAppSelector(gameActions.getOpponent());

    const countOfPlacedFirstUserShips = useAppSelector(
        firstUserActions.getCountOfPlacedUsersShips()
    );
    const countOfPlacedSecondUserShips = useAppSelector(
        secondUserActions.getCountOfPlacedUsersShips()
    );

    const firstUserScore = useAppSelector(firstUserActions.getUserScore());
    const secondUserScore = useAppSelector(secondUserActions.getUserScore());
    const robotScore = useAppSelector(robotActions.getRobotScore());

    const dispatch = useAppDispatch();

    const handleAutoPlace = () => {
        if (opponent === "robot") {
            dispatch(robotActions.placeRobotShips());
        }
        if (
            scene === "firstUserArrangement" &&
            countOfPlacedFirstUserShips === 10
        ) {
            dispatch(firstUserActions.resetUser());
        }
        if (
            scene === "secondUserArrangement" &&
            countOfPlacedSecondUserShips === 10
        ) {
            dispatch(secondUserActions.resetUser());
        }
        dispatch(
            scene === "firstUserArrangement"
                ? firstUserActions.placeUserShips()
                : secondUserActions.placeUserShips()
        );
    };

    const handleSubmit = () => {
        if (opponent === "robot") {
            dispatch(robotActions.placeRobotShips());
        }
        dispatch(gameActions.arranged());
    };

    const handleStart = () => {
        if (scene === "game") {
            dispatch(gameActions.stopGame());
        } else {
            dispatch(gameActions.startGame());
        }
    };

    useEffect(() => {
        if (firstUserScore === 0 || robotScore === 0 || secondUserScore === 0) {
            setIsResultOpen(true);
            if (
                firstUserScore > robotScore ||
                firstUserScore > secondUserScore
            ) {
                dispatch(gameActions.firstUserWin());
            } else {
                dispatch(gameActions.stopGame());
            }
        }
    }, [firstUserScore, secondUserScore, robotScore]);

    const modalPortal = document.getElementById("modal-portal");

    return (
        <div className={styles.container}>
            {isResultOpen &&
                modalPortal &&
                createPortal(
                    <Modal
                        header="Игра окончена"
                        onClick={() => setIsResultOpen(false)}
                    >
                        <Result />
                    </Modal>,
                    modalPortal
                )}
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
                    content="Против друга"
                    active={scene === "chooseDifficulty"}
                    onClick={() => dispatch(gameActions.chooseFriend())}
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
                    active={
                        scene === "firstUserArrangement" ||
                        scene === "secondUserArrangement"
                    }
                    onClick={handleAutoPlace}
                />
                <Button
                    content="Принять"
                    active={
                        scene === "firstUserArrangement" ||
                        scene === "secondUserArrangement"
                    }
                    onClick={handleSubmit}
                />
                <Button
                    content={scene === "game" ? "Закончить" : "Играть"}
                    active={scene === "starting" || scene === "game"}
                    onClick={handleStart}
                />
            </div>
        </div>
    );
};

export default Settings;
