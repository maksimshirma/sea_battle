import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { ships, IShip } from "../../../shared/lib/constants/ship";
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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userGetShoted: (state, action) => {
            const { i, j } = action.payload;

            const field = [...state.field.map((el) => [...el])];
            const ships = [...state.ships.map((ship) => ({ ...ship }))];

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
        userAutoPlaceShip: (state) => {
            const field = [...state.field.map((el) => [...el])];
            const ships = [...state.ships.map((ship) => ({ ...ship }))];

            const { field: newField, ships: newShips } = autoPlaceShips(
                field,
                ships,
                "user-board"
            );

            state.field = newField;
            state.ships = newShips;
        },
        userPlacedShip: (state, action) => {
            const { id } = action.payload;
            const ships = [...state.ships.map((ship) => ({ ...ship }))];
            const field = [...state.field.map((el) => [...el])];

            const index = ships.findIndex((ship) => ship.id === id);
            const place = findPlace(field, ships[index], "user-board");

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
        userUnplacedShip: (state, action) => {
            const { id } = action.payload;
            const ships = [...state.ships.map((ship) => ({ ...ship }))];
            const field = [...state.field.map((el) => [...el])];

            const index = ships.findIndex((ship) => ship.id === id);
            const newField = unplaceShip(field, ships[index]);

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
        userChangedShipDirection: (state, action) => {
            const { id } = action.payload;
            const ships = [...state.ships.map((ship) => ({ ...ship }))];

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
        userChangedShipCoordinates: (state, action) => {
            const { id, x, y } = action.payload;
            const ships = [...state.ships.map((ship) => ({ ...ship }))];

            const index = ships.findIndex((ship) => ship.id === id);
            ships[index] = {
                ...ships[index],
                x: x,
                y: y,
            };

            state.ships = ships;
        },
        userReset: (state) => {
            state.score = 20;
            state.ships = ships;
            state.field = field;
        },
    },
});

const { actions } = userSlice;
const {
    userGetShoted,
    userAutoPlaceShip,
    userPlacedShip,
    userUnplacedShip,
    userChangedShipDirection,
    userChangedShipCoordinates,
    userReset,
} = actions;

const shotUser =
    (payload: { i: number; j: number }) => (dispatch: AppDispatch) => {
        dispatch(userGetShoted(payload));
    };

const placeUserShips = () => (dispatch: AppDispatch) => {
    dispatch(userAutoPlaceShip());
};

const placeUserShip = (payload: { id: number }) => (dispatch: AppDispatch) => {
    dispatch(userPlacedShip(payload));
};

const unplaceUserShip =
    (payload: { id: number }) => (dispatch: AppDispatch) => {
        dispatch(userUnplacedShip(payload));
    };

const changeDirection =
    (payload: { id: number; direction?: "row" | "col" }) =>
    (dispatch: AppDispatch) => {
        dispatch(userChangedShipDirection(payload));
    };

const changeCoordinates =
    (payload: { id: number; x: number; y: number }) =>
    (dispatch: AppDispatch) => {
        dispatch(userChangedShipCoordinates(payload));
    };

const resetUser = () => (dispatch: AppDispatch) => {
    dispatch(userReset());
};

const getUserField = () => (state: RootState) => {
    return state.user.field;
};

const getUserShips = () => (state: RootState) => {
    return state.user.ships;
};

const getUserScore = () => (state: RootState) => {
    return state.user.score;
};

const getCountOfPlacedUsersShips = () => (state: RootState) => {
    return state.user.ships.reduce(
        (acc, ship) => (ship.placed ? acc + 1 : acc),
        0
    );
};

export const userActions = {
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

export default userSlice.reducer;
