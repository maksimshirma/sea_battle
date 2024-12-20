import { gameActions } from "../../../app/store/gameSlice/gameSlice";
import { useAppSelector } from "../../../app/store/store";

const Result = (): JSX.Element => {
    const winner = useAppSelector(gameActions.getWinner());

    let name: string | undefined;
    if (winner === "firstUser") {
        name = "Вы";
    } else {
        name = "Противник";
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
