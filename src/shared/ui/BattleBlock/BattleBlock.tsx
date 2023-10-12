import { useState, useEffect } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { userActions } from "../../../app/store/userSlice/userSlice";
import { robotActions } from "../../../app/store/robotSlice/robotSlice";
import {
    TWhooseMove,
    gameActions,
} from "../../../app/store/gameSlice/gameSlice";
import Icons from "../Icons";
import styles from "./BattleBlock.module.scss";

interface IProps {
    i: number;
    j: number;
    owner: TWhooseMove;
    value: number;
}

const BattleBlock = ({ i, j, owner, value }: IProps): JSX.Element => {
    const [icon, setIcon] = useState<string>("");

    const scene = useAppSelector(gameActions.getScene());
    const mode = useAppSelector(gameActions.getGameMode());
    const whooseMove = useAppSelector(gameActions.getWhooseMove());
    const opponent = useAppSelector(gameActions.getOpponent());

    const dispatch = useAppDispatch();

    const changeMove = (whooseMove: TWhooseMove) => {
        if (mode === "oneByOne") {
            dispatch(gameActions.changeWhooseMove(whooseMove));
        } else {
            if (value === 4 || value === 0) {
                dispatch(gameActions.changeWhooseMove(whooseMove));
            }
        }
    };

    const handleClick = () => {
        if (value !== 2 && value !== 3) {
            if (opponent === "robot") {
                if (whooseMove === "firstUser" && owner !== "firstUser") {
                    dispatch(robotActions.shotRobot({ i, j }));
                    changeMove("robot");
                }
            } else {
                if (whooseMove === "firstUser" && owner === "secondUser") {
                    dispatch(
                        userActions.shotUser({ person: "secondUser", i, j })
                    );
                    changeMove("secondUser");
                }
                if (whooseMove === "secondUser" && owner === "firstUser") {
                    dispatch(
                        userActions.shotUser({ person: "firstUser", i, j })
                    );
                    changeMove("firstUser");
                }
            }
        }
    };

    useEffect(() => {
        if (value === 2) {
            setIcon("boom");
            setTimeout(() => {
                setIcon("");
            }, 500);
        }
        if (value === 3) {
            setIcon("splash");
            setTimeout(() => {
                setIcon("miss");
            }, 500);
        }
    }, [value]);

    return (
        <div
            onClick={scene === "game" ? () => handleClick() : () => {}}
            className={classNames(
                styles.container,
                value !== 2 && styles.hover,
                value === 2 && styles.hitted
            )}
        >
            {(value === 3 || value === 2) && <Icons name={icon} />}
        </div>
    );
};

export default BattleBlock;
