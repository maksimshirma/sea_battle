import PlayGround from "../../widgets/PlayGround";
import Settings from "../../widgets/Settings";
import styles from "./Game.module.scss";

const Game = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <PlayGround position="left" />
            </div>
            <div className={styles.mid}>
                <Settings />
            </div>
            <div className={styles.right_side}>
                <PlayGround position="right" />
            </div>
        </div>
    );
};

export default Game;
