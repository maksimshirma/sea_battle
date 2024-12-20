import { useAppSelector } from "../../app/store/store";
import PlayBoard from "../../shared/ui/PlayBoard";
import Dock from "../../shared/ui/Dock/Dock";
import { gameActions } from "../../app/store/gameSlice/gameSlice";
import styles from "./PlayGround.module.scss";

interface IProps {
    position: "left" | "right";
}

const PlayGround = ({ position }: IProps): JSX.Element => {
    const countFirstUserWins = useAppSelector(gameActions.getCountOfUserWins());
    const countGames = useAppSelector(gameActions.getCountOfGames());
    const opponent = useAppSelector(gameActions.getOpponent());
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                {position === "left" ? (
                    <>
                        <div className={styles.name_left}>
                            <h2>Вы</h2>
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
                            <h2>Противник</h2>
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
