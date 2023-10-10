import { useState, useEffect } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { robotActions } from "../../../app/store/robotSlice/robotSlice";
import { gameActions } from "../../../app/store/gameSlice/gameSlice";
import Icons from "../Icons";
import styles from "./BattleBlock.module.scss";

interface IProps {
    i: number;
    j: number;
    owner: "user" | "robot";
    value: number;
}

const BattleBlock = ({ i, j, owner, value }: IProps): JSX.Element => {
    const [icon, setIcon] = useState<string>("");

    const scene = useAppSelector(gameActions.getScene());
    const mode = useAppSelector(gameActions.getGameMode());
    const whooseMove = useAppSelector(gameActions.getWhooseMove());

    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (owner !== "user" && whooseMove === "user") {
            if (value !== 2 && value !== 3) {
                if (mode === "oneByOne") {
                    dispatch(robotActions.shotRobot({ i, j }));
                    dispatch(gameActions.changeWhooseMove());
                } else {
                    dispatch(robotActions.shotRobot({ i, j }));
                    if (value === 4 || value === 0) {
                        dispatch(gameActions.changeWhooseMove());
                    }
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
