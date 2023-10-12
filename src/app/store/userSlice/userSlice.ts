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

export type TPerson = "firstUser" | "secondUser";

export interface IUser {
    firstUserScore: number;
    seconstUserScore: number;
    firstUserShips: IShip[];
    secondUserShips: IShip[];
    firstUserField: number[][];
    secondUserField: number[][];
}

const initialState: IUser = {
    firstUserScore: 20,
    seconstUserScore: 20,
    firstUserShips: ships,
    secondUserShips: ships,
    firstUserField: field,
    secondUserField: field,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userGetShoted: (state, action) => {
            const { i, j, person } = action.payload;

            let field;
            let ships;
            if (person === "firstUser") {
                field = state.firstUserField;
                ships = state.firstUserShips;
            } else {
                field = state.secondUserField;
                ships = state.secondUserShips;
            }

            const { field: newField, ships: newShips } = shot(
                field,
                ships,
                i,
                j
            );

            if (person === "firstUser") {
                if (newField[i][j] === 2) {
                    state.firstUserScore -= 1;
                }
                state.firstUserField = newField;
                state.firstUserShips = newShips;
            } else {
                if (newField[i][j] === 2) {
                    state.seconstUserScore -= 1;
                }
                state.secondUserField = newField;
                state.secondUserShips = newShips;
            }
        },
        userAutoPlaceShip: (state, action) => {
            const person = action.payload;

            let field;
            let ships;
            if (person === "firstUser") {
                field = state.firstUserField;
                ships = state.firstUserShips;
            } else {
                field = state.secondUserField;
                ships = state.secondUserShips;
            }

            const { field: newField, ships: newShips } = autoPlaceShips(
                field,
                ships,
                person === "firstUser"
                    ? "first-user-board"
                    : "second-user-board"
            );

            if (person === "firstUser") {
                state.firstUserField = newField;
                state.firstUserShips = newShips;
            } else {
                state.secondUserField = newField;
                state.secondUserShips = newShips;
            }
        },
        userPlacedShip: (state, action) => {
            const { person, id } = action.payload;

            let field;
            let ships;
            if (person === "firstUser") {
                field = state.firstUserField;
                ships = state.firstUserShips;
            } else {
                field = state.secondUserField;
                ships = state.secondUserShips;
            }

            const index = ships.findIndex((ship) => ship.id === id);
            const place = findPlace(
                field,
                ships[index],
                person === "firstUser"
                    ? "first-user-board"
                    : "second-user-board"
            );

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
                const newField = placeShip(field, {
                    startI,
                    startJ,
                    endI,
                    endJ,
                });
                if (person === "firstUser") {
                    state.firstUserField = newField;
                    state.firstUserShips = ships;
                } else {
                    state.secondUserField = newField;
                    state.secondUserShips = ships;
                }
            }
        },
        userUnplacedShip: (state, action) => {
            const { person, id } = action.payload;

            let field;
            let ships;
            if (person === "firstUser") {
                field = state.firstUserField;
                ships = state.firstUserShips;
            } else {
                field = state.secondUserField;
                ships = state.secondUserShips;
            }

            const index = ships.findIndex((ship) => ship.id === id);
            const newField = unplaceShip(
                field,
                ships[index],
                person === "firstUser"
                    ? "first-user-board"
                    : "second-user-board"
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

            if (person === "firstUser") {
                state.firstUserField = setNotAvailableBlocks(newField, ships);
                state.firstUserShips = ships;
            } else {
                state.secondUserField = setNotAvailableBlocks(newField, ships);
                state.secondUserShips = ships;
            }
        },
        userChangedShipDirection: (state, action) => {
            const { person, id } = action.payload;

            let ships;
            if (person === "firstUser") {
                ships = state.firstUserShips;
            } else {
                ships = state.secondUserShips;
            }

            const index = ships.findIndex((ship) => ship.id === id);
            ships[index] = {
                ...ships[index],
                direction: action.payload.diraction
                    ? action.payload.diraction
                    : ships[index].direction === "row"
                    ? "col"
                    : "row",
            };

            if (person === "firstUser") {
                state.firstUserShips = ships;
            } else {
                state.secondUserShips = ships;
            }
        },
        userChangedShipCoordinates: (state, action) => {
            const { person, id, x, y } = action.payload;

            let ships;
            if (person === "firstUser") {
                ships = state.firstUserShips;
            } else {
                ships = state.secondUserShips;
            }

            const index = ships.findIndex((ship) => ship.id === id);
            ships[index] = {
                ...ships[index],
                x: x,
                y: y,
            };

            if (person === "firstUser") {
                state.firstUserShips = ships;
            } else {
                state.secondUserShips = ships;
            }
        },
        userReset: (state, action) => {
            if (action.payload === "firstUser") {
                state.firstUserScore = 20;
                state.firstUserShips = ships;
                state.firstUserField = field;
            } else {
                state.seconstUserScore = 20;
                state.secondUserShips = ships;
                state.secondUserField = field;
            }
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
    (payload: { person: TPerson; i: number; j: number }) =>
    (dispatch: AppDispatch) => {
        dispatch(userGetShoted(payload));
    };

const placeUserShips = (payload: TPerson) => (dispatch: AppDispatch) => {
    dispatch(userAutoPlaceShip(payload));
};

const placeUserShip =
    (payload: { person: TPerson; id: number }) => (dispatch: AppDispatch) => {
        dispatch(userPlacedShip(payload));
    };

const unplaceUserShip =
    (payload: { person: TPerson; id: number }) => (dispatch: AppDispatch) => {
        dispatch(userUnplacedShip(payload));
    };

const changeDirection =
    (payload: { person: TPerson; id: number; direction?: TDirection }) =>
    (dispatch: AppDispatch) => {
        dispatch(userChangedShipDirection(payload));
    };

const changeCoordinates =
    (payload: { person: TPerson; id: number; x: number; y: number }) =>
    (dispatch: AppDispatch) => {
        dispatch(userChangedShipCoordinates(payload));
    };

const resetUser = (payload: TPerson) => (dispatch: AppDispatch) => {
    dispatch(userReset(payload));
};

const getUserField = (person: TPerson) => (state: RootState) => {
    if (person === "firstUser") {
        return state.user.firstUserField;
    } else {
        return state.user.secondUserField;
    }
};

const getUserShips = (person: TPerson) => (state: RootState) => {
    if (person === "firstUser") {
        return state.user.firstUserShips;
    } else {
        return state.user.secondUserShips;
    }
};

const getUserScore = (person: TPerson) => (state: RootState) => {
    if (person === "firstUser") {
        return state.user.firstUserScore;
    } else {
        return state.user.seconstUserScore;
    }
};

const getCountOfPlacedUsersShips = (person: TPerson) => (state: RootState) => {
    if (person === "firstUser") {
        return state.user.firstUserShips.reduce(
            (acc, ship) => (ship.placed ? acc + 1 : acc),
            0
        );
    } else {
        return state.user.secondUserShips.reduce(
            (acc, ship) => (ship.placed ? acc + 1 : acc),
            0
        );
    }
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
