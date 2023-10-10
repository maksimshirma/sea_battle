import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import classNames from "classnames";
import { shotRobot } from "../../../app/store/robotSlice/robotSlice";
import {
    changeWhooseMove,
    getGameMode,
    getScene,
    getWhooseMove,
} from "../../../app/store/gameSlice/gameSlice";
import Icons from "../Icons";
import styles from "./BattleBlock.module.scss";

interface IProps {
    i: number;
    j: number;
    who: "user" | "robot";
    value: number;
}

const BattleBlock = ({ i, j, who, value }: IProps): JSX.Element => {
    const [icon, setIcon] = useState<string>("");
    const scene = useAppSelector(getScene());
    const mode = useAppSelector(getGameMode());
    const whooseMove = useAppSelector(getWhooseMove());
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (who !== "user" && whooseMove === "user") {
            if (value !== 2 && value !== 3) {
                if (mode === "oneByOne") {
                    dispatch(shotRobot({ i, j }));
                    dispatch(changeWhooseMove());
                } else {
                    dispatch(shotRobot({ i, j }));
                    if (value === 4 || value === 0) {
                        dispatch(changeWhooseMove());
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
