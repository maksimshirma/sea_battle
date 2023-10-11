import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { ships, IShip, TDirection } from "../../../shared/lib/constants/ship";
import { field } from "../../../shared/lib/constants/field";
import { shot } from "../../../shared/lib/helpers/shot";
import { findPlace } from "../../../shared/lib/helpers/findPlace";
import { placeShip } from "../../../shared/lib/helpers/placeShip";
import { unplaceShip } from "../../../shared/lib/helpers/unplaceShip";
import { setNotAvailableBlocks } from "../../../shared/lib/helpers/setNotAvailableBlocks";
import { autoPlaceShips } from "../../../shared/lib/helpers/autoPlaceShips";

export interface IUser {
    score: number;
    ships: IShip[];
    field: number[][];
}

const initialState: IUser = {
    score: 20,
    ships: ships,
    field: field,
};

export const secondUserSlice = createSlice({
    name: "secondUser",
    initialState,
    reducers: {
        secondUserGetShoted: (state, action) => {
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
        secondUserAutoPlaceShip: (state) => {
            const field = state.field;
            const ships = state.ships;

            const { field: newField, ships: newShips } = autoPlaceShips(
                field,
                ships,
                "second-user-board"
            );

            state.field = newField;
            state.ships = newShips;
        },
        secondUserPlacedShip: (state, action) => {
            const ships = state.ships;
            const field = state.field;

            const index = ships.findIndex((ship) => ship.id === action.payload);
            const place = findPlace(field, ships[index], "second-user-board");

            if (place) {
                const { startI, startJ, endI, endJ, x, y } = place;
                ships[index] = {
                    ...ships[index],
                    placed: true,
                    x: x,
                    y: y,
                    startI: startI,
                    startJ: startJ,
                    endI: endI,
                    endJ: endJ,
                };
                state.ships = ships;
                state.field = placeShip(field, {
                    startI,
                    startJ,
                    endI,
                    endJ,
                });
            }
        },
        secondUserUnplacedShip: (state, action) => {
            const ships = state.ships;
            const field = state.field;

            const index = ships.findIndex((ship) => ship.id === action.payload);
            const newField = unplaceShip(
                field,
                ships[index],
                "second-user-board"
            );

            ships[index] = {
                ...ships[index],
                direction: "row",
                placed: false,
                x: 0,
                y: 0,
                startI: undefined,
                startJ: undefined,
            };

            state.field = setNotAvailableBlocks(newField, ships);
            state.ships = ships;
        },
        secondUserChangedShipDirection: (state, action) => {
            const { id } = action.payload;
            const ships = state.ships;

            const index = ships.findIndex((ship) => ship.id === id);
            ships[index] = {
                ...ships[index],
                direction: action.payload.diraction
                    ? action.payload.diraction
                    : ships[index].direction === "row"
                    ? "col"
                    : "row",
            };

            state.ships = ships;
        },
        secondUserChangedShipCoordinates: (state, action) => {
            const { id, x, y } = action.payload;
            const ships = state.ships;

            const index = ships.findIndex((ship) => ship.id === id);
            ships[index] = {
                ...ships[index],
                x: x,
                y: y,
            };

            state.ships = ships;
        },
        secondUserReset: (state) => {
            state.score = 20;
            state.ships = ships;
            state.field = field;
        },
    },
});

const { actions } = secondUserSlice;
const {
    secondUserGetShoted,
    secondUserAutoPlaceShip,
    secondUserPlacedShip,
    secondUserUnplacedShip,
    secondUserChangedShipDirection,
    secondUserChangedShipCoordinates,
    secondUserReset,
} = actions;

const shotUser =
    (payload: { i: number; j: number }) => (dispatch: AppDispatch) => {
        dispatch(secondUserGetShoted(payload));
    };

const placeUserShips = () => (dispatch: AppDispatch) => {
    dispatch(secondUserAutoPlaceShip());
};

const placeUserShip = (payload: number) => (dispatch: AppDispatch) => {
    dispatch(secondUserPlacedShip(payload));
};

const unplaceUserShip = (payload: number) => (dispatch: AppDispatch) => {
    dispatch(secondUserUnplacedShip(payload));
};

const changeDirection =
    (payload: { id: number; direction?: TDirection }) =>
    (dispatch: AppDispatch) => {
        dispatch(secondUserChangedShipDirection(payload));
    };

const changeCoordinates =
    (payload: { id: number; x: number; y: number }) =>
    (dispatch: AppDispatch) => {
        dispatch(secondUserChangedShipCoordinates(payload));
    };

const resetUser = () => (dispatch: AppDispatch) => {
    dispatch(secondUserReset());
};

const getUserField = () => (state: RootState) => {
    return state.secondUser.field;
};

const getUserShips = () => (state: RootState) => {
    return state.secondUser.ships;
};

const getUserScore = () => (state: RootState) => {
    return state.secondUser.score;
};

const getCountOfPlacedUsersShips = () => (state: RootState) => {
    return state.secondUser.ships.reduce(
        (acc, ship) => (ship.placed ? acc + 1 : acc),
        0
    );
};

export const secondUserActions = {
    shotUser,
    placeUserShips,
    placeUserShip,
    unplaceUserShip,
    changeDirection,
    changeCoordinates,
    resetUser,
    getUserField,
    getUserShips,
    getUserScore,
    getCountOfPlacedUsersShips,
};

export default secondUserSlice.reducer;
