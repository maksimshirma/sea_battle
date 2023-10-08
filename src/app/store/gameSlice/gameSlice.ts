import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

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
}

const initialState: IState = {
    countOfGames: 0,
    countOfUserWins: 0,
    difficulty: undefined,
    mode: "oneByOne",
    scene: "chooseMode",
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
        },
        gameStop: (state) => {
            state.scene = "end";
            state.countOfGames += 1;
        },
        gameResetSettings: (state) => {
            state.difficulty = undefined;
            state.mode = "oneByOne";
            state.scene = "chooseMode";
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
    gameStop,
    gameResetSettings,
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

export const stopGame = () => (dispatch: AppDispatch) => {
    dispatch(gameStop());
};

export const resetSettings = () => (dispatch: AppDispatch) => {
    dispatch(gameResetSettings());
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

export default gameSlice.reducer;
