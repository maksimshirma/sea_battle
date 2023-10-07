import { useState } from "react";
import Board from "../../shared/ui/Board";
import TextField from "../../shared/ui/TextField";
import styles from "./PlayGround.module.scss";

interface IProps {
    position: "left" | "right";
}

const PlayGround = ({ position }: IProps): JSX.Element => {
    const [name, setName] = useState<string>("");
    const [score] = useState<number>(20);

    const handleChange = (value: string) => {
        setName(value);
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
                        <div className={styles.score}>{score}</div>
                    </>
                ) : (
                    <>
                        <div className={styles.score}>{score}</div>
                        <div className={styles.name}>Робот</div>
                    </>
                )}
            </div>
            <Board position={position} />
        </div>
    );
};

export default PlayGround;
