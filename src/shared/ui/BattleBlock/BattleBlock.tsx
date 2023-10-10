import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import classNames from "classnames";
import { shotRobot } from "../../../app/store/robotSlice/robotSlice";
import { getScene } from "../../../app/store/gameSlice/gameSlice";
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
    const dispatch = useAppDispatch();

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
            onClick={
                who !== "user" && scene === "game"
                    ? () => {
                          if (value !== 2 && value !== 3) {
                              dispatch(shotRobot({ i, j }));
                          }
                      }
                    : () => {}
            }
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
