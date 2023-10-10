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
    const scene = useAppSelector(getScene());
    const dispatch = useAppDispatch();
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
            data-set-i={i}
            data-set-j={j}
        >
            {value === 3 && <Icons name="miss" />}
        </div>
    );
};

export default BattleBlock;
