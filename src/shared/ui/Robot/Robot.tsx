import { useEffect, useRef } from "react";
import { gameActions } from "../../../app/store/gameSlice/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { userActions } from "../../../app/store/userSlice/userSlice";
import { getRandomBetween } from "../../lib/helpers/getRandomBetween";

const Robot = (): null => {
    const ref = useRef<number>(0);

    const mode = useAppSelector(gameActions.getGameMode());
    const difficulty = useAppSelector(gameActions.getGameDifficulty());
    const whooseMove = useAppSelector(gameActions.getWhooseMove());
    const scene = useAppSelector(gameActions.getScene());

    const userField = useAppSelector(userActions.getUserField("firstUser"));

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
                const { i, j } = getBlock();
                setTimeout(() => {
                    dispatch(
                        userActions.shotUser({ person: "firstUser", i, j })
                    );
                    dispatch(gameActions.changeWhooseMove());
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
                        dispatch(gameActions.changeWhooseMove());
                        clearInterval(ref.current);
                    }
                    dispatch(
                        userActions.shotUser({ person: "firstUser", i, j })
                    );
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
