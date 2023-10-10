import { useAppDispatch } from "../../../app/store/store";
import { shotUser } from "../../../app/store/userSlice/userSlice";
import styles from "./BattleBlock.module.scss";

interface IProps {
    i: number;
    j: number;
}

const BattleBlock = ({ i, j }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    return (
        <div
            onClick={() => dispatch(shotUser({ i, j }))}
            className={styles.container}
            data-set-i={i}
            data-set-j={j}
        ></div>
    );
};

export default BattleBlock;
