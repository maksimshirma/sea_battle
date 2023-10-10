import { resetRobot } from "../robotSlice/robotSlice";
import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { resetUser } from "../userSlice/userSlice";

export type TDifficulty = "easy" | "normal" | "hard";

export type TMode = "oneByOne" | "toMiss";

export type TScene =
    | "chooseMode"
    | "chooseDifficulty"
    | "chooseArrangement"
    | "arrangement"
    | "starting"
    | "game"
    | "end";

interface IState {
    countOfGames: number;
    countOfUserWins: number;
    difficulty?: TDifficulty;
    mode: TMode;
    scene: TScene;
    whooseMove: "user" | "robot";
}

const initialState: IState = {
    countOfGames: 0,
    countOfUserWins: 0,
    difficulty: undefined,
    mode: "oneByOne",
    scene: "chooseMode",
    whooseMove: "user",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        gameChangeMode: (state, action) => {
            state.mode = action.payload;
            state.scene = "chooseDifficulty";
        },
        gameChangeDifficulty: (state, action) => {
            state.difficulty = action.payload;
            state.scene = "chooseArrangement";
        },
        gameChoosedManualArrangement: (state) => {
            state.scene = "arrangement";
        },
        gameArranged: (state) => {
            state.scene = "starting";
        },
        gameStart: (state) => {
            state.scene = "game";
            state.whooseMove = "user";
        },
        gameChangeWhooseMove: (state, action) => {
            if (action.payload) {
                state.whooseMove = action.payload.whooseMove;
            } else {
                state.whooseMove =
                    state.whooseMove === "robot" ? "user" : "robot";
            }
        },
        gameStop: (state) => {
            state.scene = "end";
            state.countOfGames += 1;
            state.whooseMove = "user";
        },
        gameResetSettings: (state) => {
            state.difficulty = undefined;
            state.mode = "oneByOne";
            state.scene = "chooseMode";
        },
        gameUserWin: (state) => {
            state.countOfUserWins += 1;
        },
    },
});

const { actions } = gameSlice;
const {
    gameChangeMode,
    gameChangeDifficulty,
    gameChoosedManualArrangement,
    gameArranged,
    gameStart,
    gameChangeWhooseMove,
    gameStop,
    gameResetSettings,
    gameUserWin,
} = actions;

export const changeMode = (payload: TMode) => (dispatch: AppDispatch) => {
    dispatch(gameChangeMode(payload));
};

export const changeDifficulty =
    (payload: TDifficulty) => (dispatch: AppDispatch) => {
        dispatch(gameChangeDifficulty(payload));
    };

export const manualArrange = () => (dispatch: AppDispatch) => {
    dispatch(gameChoosedManualArrangement());
};

export const arranged = () => (dispatch: AppDispatch) => {
    dispatch(gameArranged());
};

export const startGame = () => (dispatch: AppDispatch) => {
    dispatch(gameStart());
};

export const changeWhooseMove =
    (payload?: { whooseMove: "user" | "robot" }) => (dispatch: AppDispatch) => {
        dispatch(gameChangeWhooseMove(payload));
    };

export const stopGame = () => (dispatch: AppDispatch) => {
    dispatch(gameStop());
    dispatch(resetSettings());
    dispatch(resetRobot());
    dispatch(resetUser());
};

export const resetSettings = () => (dispatch: AppDispatch) => {
    dispatch(gameResetSettings());
};

export const userWon = () => (dispatch: AppDispatch) => {
    dispatch(stopGame());
    dispatch(gameUserWin());
    dispatch(resetSettings());
};

export const getGameMode = () => (state: RootState) => {
    return state.game.mode;
};

export const getGameDifficulty = () => (state: RootState) => {
    return state.game.difficulty;
};

export const getCountOfGames = () => (state: RootState) => {
    return state.game.countOfGames;
};

export const getCountOfUserWins = () => (state: RootState) => {
    return state.game.countOfUserWins;
};

export const getScene = () => (state: RootState) => {
    return state.game.scene;
};

export const getWhooseMove = () => (state: RootState) => {
    return state.game.whooseMove;
};

export default gameSlice.reducer;
