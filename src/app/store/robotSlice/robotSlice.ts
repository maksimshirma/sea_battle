import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { ships, IShip } from "../../../shared/lib/constants/ship";
import { field } from "../../../shared/lib/constants/field";
import { shot } from "../../../shared/lib/helpers/shot";
import { autoPlaceShips } from "../../../shared/lib/helpers/autoPlaceShips";

export interface IRobot {
    score: number;
    ships: IShip[];
    field: number[][];
}

const initialState: IRobot = {
    score: 20,
    ships: ships,
    field: field,
};

export const robotSlice = createSlice({
    name: "robot",
    initialState,
    reducers: {
        robotGetShoted: (state, action) => {
            const { i, j } = action.payload;

            const field = state.field;
            const ships = state.ships;

            const { field: newField, ships: newShips } = shot(
                field,
                ships,
                i,
                j
            );

            if (newField[i][j] === 2) {
                state.score -= 1;
            }

            state.field = newField;
            state.ships = newShips;
        },
        robotPlacedShips: (state) => {
            const field = state.field;
            const ships = state.ships;

            const { field: newField, ships: newShips } = autoPlaceShips(
                field,
                ships,
                "robot-board"
            );

            state.field = newField;
            state.ships = newShips;
        },
        robotReset: (state) => {
            state.score = 20;
            state.ships = ships;
            state.field = field;
        },
    },
});

const { actions } = robotSlice;
const { robotGetShoted, robotPlacedShips, robotReset } = actions;

const shotRobot =
    (payload: { i: number; j: number }) => (dispatch: AppDispatch) => {
        dispatch(robotGetShoted(payload));
    };

const placeRobotShips = () => (dispatch: AppDispatch) => {
    dispatch(robotPlacedShips());
};

const resetRobot = () => (dispatch: AppDispatch) => {
    dispatch(robotReset());
};

const getRobotField = () => (state: RootState) => {
    return state.robot.field;
};

const getRobotScore = () => (state: RootState) => {
    return state.robot.score;
};

export const robotActions = {
    shotRobot,
    placeRobotShips,
    resetRobot,
    getRobotField,
    getRobotScore,
};

export default robotSlice.reducer;
