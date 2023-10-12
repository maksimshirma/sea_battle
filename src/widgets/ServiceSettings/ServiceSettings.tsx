import { useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import Modal from "../../shared/ui/Modal/Modal";
import Icons from "../../shared/ui/Icons";
import Rules from "../../shared/ui/Rules";
import { serviceActions } from "../../app/store/serviceSlice/serviceSlice";
import { gameActions } from "../../app/store/gameSlice/gameSlice";
import { userActions } from "../../app/store/userSlice/userSlice";
import { robotActions } from "../../app/store/robotSlice/robotSlice";
import styles from "./ServiceSettings.module.scss";

const ServiceSettings = (): JSX.Element => {
    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

    const theme = useAppSelector(serviceActions.getTheme());
    const scene = useAppSelector(gameActions.getScene());
    const dispatch = useAppDispatch();

    const handleReset = () => {
        if (scene !== "game") {
            dispatch(gameActions.resetSettings());
            dispatch(userActions.resetUser("firstUser"));
            dispatch(userActions.resetUser("secondUser"));
            dispatch(robotActions.resetRobot());
        }
    };

    const modalPortal = document.getElementById("modal-portal");
    return (
        <div className={styles.container}>
            {isRulesOpen &&
                modalPortal &&
                createPortal(
                    <Modal
                        header="Правила"
                        onClick={() => setIsRulesOpen(false)}
                    >
                        <Rules />
                    </Modal>,
                    modalPortal
                )}
            <Icons
                name="info"
                margin="10px"
                onClick={() => setIsRulesOpen((prev) => !prev)}
            />
            {theme === "light" ? (
                <Icons
                    name="sun"
                    margin="10px"
                    onClick={() => dispatch(serviceActions.changeTheme())}
                />
            ) : (
                <Icons
                    name="moon"
                    margin="10px"
                    onClick={() => dispatch(serviceActions.changeTheme())}
                />
            )}
            <Icons name="reset" onClick={handleReset} />
        </div>
    );
};

export default ServiceSettings;
