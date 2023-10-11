import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { robotActions } from "../robotSlice/robotSlice";
import { firstUserActions } from "../firstUserSlice/firstUserSlice";
import { secondUserActions } from "../secondUserSlice/secondUserSlice";

export type TDifficulty = "easy" | "normal" | "hard";

export type TMode = "oneByOne" | "toMiss";

export type TWhooseMove = "firstUser" | "robot" | "secondUser";

export type TOponnent = "secondUser" | "robot";

export type TScene =
    | "chooseMode"
    | "chooseDifficulty"
    | "firstUserArrangement"
    | "secondUserArrangement"
    | "starting"
    | "game"
    | "end";

interface IState {
    countOfGames: number;
    countOfUserWins: number;
    difficulty?: TDifficulty;
    mode: TMode;
    scene: TScene;
    whooseMove: TWhooseMove;
    opponent: TOponnent;
}

const initialState: IState = {
    countOfGames: 0,
    countOfUserWins: 0,
    difficulty: undefined,
    mode: "oneByOne",
    scene: "chooseMode",
    whooseMove: "firstUser",
    opponent: "robot",
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
            state.opponent = "robot";
            state.scene = "firstUserArrangement";
        },
        gameShoosedFriend: (state) => {
            state.opponent = "secondUser";
            state.scene = "firstUserArrangement";
        },
        gameArranged: (state) => {
            if (
                state.opponent === "secondUser" &&
                state.scene === "firstUserArrangement"
            ) {
                state.scene = "secondUserArrangement";
            } else {
                state.scene = "starting";
            }
        },
        gameStart: (state) => {
            state.scene = "game";
            state.whooseMove = "firstUser";
        },
        gameChangeWhooseMove: (state, action) => {
            if (action.payload) {
                state.whooseMove = action.payload;
            } else if (state.opponent === "robot") {
                state.whooseMove =
                    state.whooseMove === "robot" ? "firstUser" : "robot";
            }
        },
        gameStop: (state) => {
            state.scene = "end";
            state.countOfGames += 1;
            state.whooseMove = "firstUser";
        },
        gameResetSettings: (state) => {
            state.difficulty = undefined;
            state.mode = "oneByOne";
            state.scene = "chooseMode";
        },
        gameFirstUserWin: (state) => {
            state.countOfUserWins += 1;
        },
    },
});

const { actions } = gameSlice;
const {
    gameChangeMode,
    gameChangeDifficulty,
    gameShoosedFriend,
    gameArranged,
    gameStart,
    gameChangeWhooseMove,
    gameStop,
    gameResetSettings,
    gameFirstUserWin,
} = actions;

const changeMode = (payload: TMode) => (dispatch: AppDispatch) => {
    dispatch(gameChangeMode(payload));
};

const changeDifficulty = (payload: TDifficulty) => (dispatch: AppDispatch) => {
    dispatch(gameChangeDifficulty(payload));
};

const chooseFriend = () => (dispatch: AppDispatch) => {
    dispatch(gameShoosedFriend());
};

const arranged = () => (dispatch: AppDispatch) => {
    dispatch(gameArranged());
};

const startGame = () => (dispatch: AppDispatch) => {
    dispatch(gameStart());
};

const changeWhooseMove = (payload?: TWhooseMove) => (dispatch: AppDispatch) => {
    dispatch(gameChangeWhooseMove(payload));
};

const stopGame = () => (dispatch: AppDispatch) => {
    dispatch(gameStop());
    dispatch(resetSettings());
    dispatch(robotActions.resetRobot());
    dispatch(firstUserActions.resetUser());
    dispatch(secondUserActions.resetUser());
};

const resetSettings = () => (dispatch: AppDispatch) => {
    dispatch(gameResetSettings());
};

const firstUserWin = () => (dispatch: AppDispatch) => {
    dispatch(stopGame());
    dispatch(gameFirstUserWin());
    dispatch(resetSettings());
};

const getGameMode = () => (state: RootState) => {
    return state.game.mode;
};

const getGameDifficulty = () => (state: RootState) => {
    return state.game.difficulty;
};

const getCountOfGames = () => (state: RootState) => {
    return state.game.countOfGames;
};

const getCountOfUserWins = () => (state: RootState) => {
    return state.game.countOfUserWins;
};

const getScene = () => (state: RootState) => {
    return state.game.scene;
};

const getWhooseMove = () => (state: RootState) => {
    return state.game.whooseMove;
};

const getOpponent = () => (state: RootState) => {
    return state.game.opponent;
};

export const gameActions = {
    changeMode,
    changeDifficulty,
    chooseFriend,
    arranged,
    startGame,
    changeWhooseMove,
    stopGame,
    resetSettings,
    firstUserWin,
    getGameMode,
    getGameDifficulty,
    getCountOfGames,
    getCountOfUserWins,
    getScene,
    getWhooseMove,
    getOpponent,
};

export default gameSlice.reducer;
