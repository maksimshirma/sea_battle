import Board from "../../shared/ui/Board";
import TextField from "../../shared/ui/TextField";
import styles from "./PlayGround.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { getUserName, setName } from "../../app/store/userSlice/userSlice";

interface IProps {
    position: "left" | "right";
}

const PlayGround = ({ position }: IProps): JSX.Element => {
    const name = useAppSelector(getUserName());
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
                        <div className={styles.score}>20</div>
                    </>
                ) : (
                    <>
                        <div className={styles.score}>20</div>
                        <div className={styles.name}>Робот</div>
                    </>
                )}
            </div>
            <Board position={position} />
        </div>
    );
};

export default PlayGround;
