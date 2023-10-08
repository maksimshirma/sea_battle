import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export type TDifficulty = "easy" | "normal" | "hard";

export type TModes = "oneByOne" | "toMiss";

interface IState {
    game: number;
    userWins: number;
    difficulty?: TDifficulty;
    mode: TModes;
    isGoing: boolean;
}

const initialState: IState = {
    game: 0,
    userWins: 0,
    difficulty: undefined,
    mode: "oneByOne",
    isGoing: false,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        gameChangeMode: (state, action) => {
            state.mode = action.payload;
        },
        gameChangeDifficulty: (state, action) => {
            state.difficulty = action.payload;
        },
        gameStart: (state) => {
            state.isGoing = true;
        },
        gameStop: (state) => {
            state.isGoing = false;
            state.game += 1;
        },
        gameUserWin: (state) => {
            state.isGoing = false;
            state.game += 1;
            state.userWins += 1;
        },
    },
});

const { actions } = gameSlice;
const {
    gameChangeMode,
    gameChangeDifficulty,
    gameStart,
    gameStop,
    gameUserWin,
} = actions;

export const changeMode = (payload: TModes) => (dispatch: AppDispatch) => {
    dispatch(gameChangeMode(payload));
};

export const changeDifficulty =
    (payload: TDifficulty) => (dispatch: AppDispatch) => {
        dispatch(gameChangeDifficulty(payload));
    };

export const startGame = () => (dispatch: AppDispatch) => {
    dispatch(gameStart());
};

export const stopGame = () => (dispatch: AppDispatch) => {
    dispatch(gameStop());
};

export const userWin = () => (dispatch: AppDispatch) => {
    dispatch(gameUserWin());
};

export const getGameMode = () => (state: RootState) => {
    return state.game.mode;
};

export const getGameDifficulty = () => (state: RootState) => {
    return state.game.difficulty;
};

export const getCountOfGames = () => (state: RootState) => {
    return state.game.game;
};

export const getCountOfUserWins = () => (state: RootState) => {
    return state.game.userWins;
};

export const getIsGameGoing = () => (state: RootState) => {
    return state.game.isGoing;
};

export default gameSlice.reducer;
