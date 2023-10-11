import { useAppDispatch, useAppSelector } from "../../app/store/store";
import PlayBoard from "../../shared/ui/PlayBoard";
import Dock from "../../shared/ui/Dock/Dock";
import TextField from "../../shared/ui/TextField";
import { serviceActions } from "../../app/store/serviceSlice/serviceSlice";
import { gameActions } from "../../app/store/gameSlice/gameSlice";
import styles from "./PlayGround.module.scss";

interface IProps {
    position: "left" | "right";
}

const PlayGround = ({ position }: IProps): JSX.Element => {
    const firstName = useAppSelector(serviceActions.getFirstUserName());
    const secondName = useAppSelector(serviceActions.getSecondUserName());
    const countFirstUserWins = useAppSelector(gameActions.getCountOfUserWins());
    const countGames = useAppSelector(gameActions.getCountOfGames());
    const opponent = useAppSelector(gameActions.getOpponent());
    const dispatch = useAppDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                {position === "left" ? (
                    <>
                        <div className={styles.name_left}>
                            <TextField
                                label=""
                                name="name"
                                value={firstName}
                                onChange={(value: string) =>
                                    dispatch(serviceActions.setFirstName(value))
                                }
                                placeholder="Введите имя..."
                            />
                        </div>
                        <div className={styles.score_left}>
                            {countFirstUserWins}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.score_right}>
                            {countGames - countFirstUserWins}
                        </div>
                        <div className={styles.name_right}>
                            <TextField
                                label=""
                                name="name"
                                value={secondName}
                                onChange={(value: string) =>
                                    dispatch(
                                        serviceActions.setSecondName(value)
                                    )
                                }
                                placeholder="Введите имя..."
                            />
                        </div>
                    </>
                )}
            </div>
            {position === "left" ? (
                <>
                    <PlayBoard owner="firstUser" />
                    <Dock owner="firstUser" />
                </>
            ) : (
                <>
                    <PlayBoard owner={opponent} />
                    {opponent === "secondUser" && <Dock owner="secondUser" />}
                </>
            )}
        </div>
    );
};

export default PlayGround;
