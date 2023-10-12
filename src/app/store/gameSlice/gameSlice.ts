import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { robotActions } from "../robotSlice/robotSlice";
import { userActions } from "../userSlice/userSlice";

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
    winner: TWhooseMove | "none";
}

const initialState: IState = {
    countOfGames: 0,
    countOfUserWins: 0,
    difficulty: undefined,
    mode: "oneByOne",
    scene: "chooseMode",
    whooseMove: "firstUser",
    opponent: "robot",
    winner: "none",
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
            state.winner = "none";
        },
        gameChangeWhooseMove: (state, action) => {
            if (action.payload) {
                state.whooseMove = action.payload;
            } else if (state.opponent === "robot") {
                state.whooseMove =
                    state.whooseMove === "robot" ? "firstUser" : "robot";
            }
        },
        gameEnd: (state, action) => {
            state.scene = "end";
            state.countOfGames += 1;
            state.winner = action.payload;
            if (action.payload === "firstUser") {
                state.countOfUserWins += 1;
            }
            if (action.payload === "none") {
                state.countOfGames -= 1;
            }
            state.whooseMove = "firstUser";
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
    gameShoosedFriend,
    gameArranged,
    gameStart,
    gameChangeWhooseMove,
    gameResetSettings,
    gameEnd,
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

const endGame =
    (payload: "firstUser" | "secondUser" | "robot" | "none") =>
    (dispatch: AppDispatch) => {
        dispatch(gameEnd(payload));
        dispatch(resetSettings());
        dispatch(robotActions.resetRobot());
        dispatch(userActions.resetUser("firstUser"));
        dispatch(userActions.resetUser("secondUser"));
    };

const resetSettings = () => (dispatch: AppDispatch) => {
    dispatch(gameResetSettings());
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

const getWinner = () => (state: RootState) => {
    return state.game.winner;
};

export const gameActions = {
    changeMode,
    changeDifficulty,
    chooseFriend,
    arranged,
    startGame,
    changeWhooseMove,
    resetSettings,
    endGame,
    getGameMode,
    getGameDifficulty,
    getCountOfGames,
    getCountOfUserWins,
    getScene,
    getWhooseMove,
    getOpponent,
    getWinner,
};

export default gameSlice.reducer;
