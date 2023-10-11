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

export const firstUserSlice = createSlice({
    name: "firstUser",
    initialState,
    reducers: {
        firstUserGetShoted: (state, action) => {
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
        firstUserAutoPlaceShip: (state) => {
            const field = state.field;
            const ships = state.ships;

            const { field: newField, ships: newShips } = autoPlaceShips(
                field,
                ships,
                "first-user-board"
            );

            state.field = newField;
            state.ships = newShips;
        },
        firstUserPlacedShip: (state, action) => {
            const ships = state.ships;
            const field = state.field;

            const index = ships.findIndex((ship) => ship.id === action.payload);
            const place = findPlace(field, ships[index], "first-user-board");

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
        firstUserUnplacedShip: (state, action) => {
            const ships = state.ships;
            const field = state.field;

            const index = ships.findIndex((ship) => ship.id === action.payload);
            const newField = unplaceShip(
                field,
                ships[index],
                "first-user-board"
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
        firstUserChangedShipDirection: (state, action) => {
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
        firstUserChangedShipCoordinates: (state, action) => {
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
        firstUserReset: (state) => {
            state.score = 20;
            state.ships = ships;
            state.field = field;
        },
    },
});

const { actions } = firstUserSlice;
const {
    firstUserGetShoted,
    firstUserAutoPlaceShip,
    firstUserPlacedShip,
    firstUserUnplacedShip,
    firstUserChangedShipDirection,
    firstUserChangedShipCoordinates,
    firstUserReset,
} = actions;

const shotUser =
    (payload: { i: number; j: number }) => (dispatch: AppDispatch) => {
        dispatch(firstUserGetShoted(payload));
    };

const placeUserShips = () => (dispatch: AppDispatch) => {
    dispatch(firstUserAutoPlaceShip());
};

const placeUserShip = (payload: number) => (dispatch: AppDispatch) => {
    dispatch(firstUserPlacedShip(payload));
};

const unplaceUserShip = (payload: number) => (dispatch: AppDispatch) => {
    dispatch(firstUserUnplacedShip(payload));
};

const changeDirection =
    (payload: { id: number; direction?: TDirection }) =>
    (dispatch: AppDispatch) => {
        dispatch(firstUserChangedShipDirection(payload));
    };

const changeCoordinates =
    (payload: { id: number; x: number; y: number }) =>
    (dispatch: AppDispatch) => {
        dispatch(firstUserChangedShipCoordinates(payload));
    };

const resetUser = () => (dispatch: AppDispatch) => {
    dispatch(firstUserReset());
};

const getUserField = () => (state: RootState) => {
    return state.firstUser.field;
};

const getUserShips = () => (state: RootState) => {
    return state.firstUser.ships;
};

const getUserScore = () => (state: RootState) => {
    return state.firstUser.score;
};

const getCountOfPlacedUsersShips = () => (state: RootState) => {
    return state.firstUser.ships.reduce(
        (acc, ship) => (ship.placed ? acc + 1 : acc),
        0
    );
};

export const firstUserActions = {
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

export default firstUserSlice.reducer;
