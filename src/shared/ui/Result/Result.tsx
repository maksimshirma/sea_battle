import { gameActions } from "../../../app/store/gameSlice/gameSlice";
import { serviceActions } from "../../../app/store/serviceSlice/serviceSlice";
import { useAppSelector } from "../../../app/store/store";

const Result = (): JSX.Element => {
    const winner = useAppSelector(gameActions.getWinner());
    const firstUserName = useAppSelector(serviceActions.getFirstUserName());
    const secondUserName = useAppSelector(serviceActions.getSecondUserName());

    let name: string | undefined;
    if (winner === "firstUser") {
        name = firstUserName;
    } else if (winner === "secondUser") {
        name = secondUserName;
    } else if (winner === "robot") {
        name = "Робот";
    }

    return (
        <>
            <p>Это была прекрасная игра!</p>

            <p>
                {name
                    ? `${name} победил в данной схватке.`
                    : "Победила дружба!"}{" "}
            </p>
        </>
    );
};

export default Result;
