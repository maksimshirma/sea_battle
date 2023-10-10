import { useAppDispatch, useAppSelector } from "../../app/store/store";
import PlayBoard from "../../shared/ui/PlayBoard";
import TextField from "../../shared/ui/TextField";
import { userActions } from "../../app/store/userSlice/userSlice";
import { serviceActions } from "../../app/store/serviceSlice/serviceSlice";
import { robotActions } from "../../app/store/robotSlice/robotSlice";
import styles from "./PlayGround.module.scss";

interface IProps {
    position: "left" | "right";
}

const PlayGround = ({ position }: IProps): JSX.Element => {
    const name = useAppSelector(serviceActions.getUserName());
    const userScore = useAppSelector(userActions.getUserScore());
    const robotScore = useAppSelector(robotActions.getRobotScore());
    const dispatch = useAppDispatch();

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
                                onChange={(value: string) =>
                                    dispatch(serviceActions.setName(value))
                                }
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
            {position === "left" ? (
                <PlayBoard owner="user" />
            ) : (
                <PlayBoard owner="robot" />
            )}
        </div>
    );
};

export default PlayGround;
