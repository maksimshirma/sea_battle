import { useEffect, useRef } from "react";
import {
    changeWhooseMove,
    getGameDifficulty,
    getGameMode,
    getScene,
    getWhooseMove,
} from "../../../app/store/gameSlice/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { getUserField, shotUser } from "../../../app/store/userSlice/userSlice";
import { getRandomBetween } from "../../lib/helpers/getRandomBetween";

const Robot = () => {
    const ref = useRef<number>(0);
    const mode = useAppSelector(getGameMode());
    const difficulty = useAppSelector(getGameDifficulty());
    const whooseMove = useAppSelector(getWhooseMove());
    const userField = useAppSelector(getUserField());
    const scene = useAppSelector(getScene());
    const dispatch = useAppDispatch();

    const getRandomBlock = () => {
        let i = getRandomBetween(0, 9);
        let j = getRandomBetween(0, 9);
        while (userField[i][j] === 3 || userField[i][j] === 2) {
            i = getRandomBetween(0, 9);
            j = getRandomBetween(0, 9);
        }
        return { i, j };
    };

    const getBlock = () => {
        if (difficulty === "hard") {
            const { i, j } = getRandomBlock();
            if (userField[i][j] === 1) {
                return { i, j };
            } else {
                const { i, j } = getRandomBlock();
                if (userField[i][j] === 1) {
                    return { i, j };
                }
            }
            return getRandomBlock();
        }

        if (difficulty === "normal") {
            const { i, j } = getRandomBlock();
            if (userField[i][j] === 1) {
                return { i, j };
            }
            return getRandomBlock();
        }

        return getRandomBlock();
    };

    useEffect(() => {
        if (whooseMove === "robot") {
            if (mode === "oneByOne") {
                setTimeout(() => {
                    dispatch(shotUser(getBlock()));
                    dispatch(changeWhooseMove());
                }, 1000);
            } else {
                const prev: string[] = [];
                ref.current = setInterval(() => {
                    let { i, j } = getBlock();

                    while (prev.includes(`${i}${j}`)) {
                        const res = getBlock();
                        i = res.i;
                        j = res.j;
                    }
                    prev.push(`${i}${j}`);

                    if (userField[i][j] !== 1) {
                        dispatch(changeWhooseMove());
                        clearInterval(ref.current);
                    }
                    dispatch(shotUser({ i, j }));
                }, 1000);
            }
        }
    }, [whooseMove]);

    useEffect(() => {
        if (scene !== "game") {
            clearInterval(ref.current);
        }
    }, [scene]);

    return null;
};

export default Robot;
