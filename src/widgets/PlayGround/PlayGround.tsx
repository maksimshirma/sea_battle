import TextField from "../../shared/ui/TextField";
import RobotBoard from "../../shared/ui/RobotBoard";
import UserBoard from "../../shared/ui/UserBoard";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { getUserScore } from "../../app/store/userSlice/userSlice";
import {
    getUserName,
    setName,
} from "../../app/store/serviceSlice/serviceSlice";
import { getRobotScore } from "../../app/store/robotSlice/robotSlice";
import styles from "./PlayGround.module.scss";

interface IProps {
    position: "left" | "right";
}

const PlayGround = ({ position }: IProps): JSX.Element => {
    const name = useAppSelector(getUserName());
    const userScore = useAppSelector(getUserScore());
    const robotScore = useAppSelector(getRobotScore());
    const dispatch = useAppDispatch();

    const handleChange = (value: string) => {
        dispatch(setName(value));
    };

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                {position === "left" ? (
                    <>
                        <div className={styles.name}>
                            <TextField
                                label=""
                                name="name"
                                value={name}
                                onChange={handleChange}
                                placeholder="Введите имя..."
                            />
                        </div>
                        <div className={styles.score}>{userScore}</div>
                    </>
                ) : (
                    <>
                        <div className={styles.score}>{robotScore}</div>
                        <div className={styles.name}>Робот</div>
                    </>
                )}
            </div>
            {position === "left" ? <UserBoard /> : <RobotBoard />}
        </div>
    );
};

export default PlayGround;
