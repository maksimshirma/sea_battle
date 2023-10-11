import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

interface IState {
    fistName: string;
    secondName: string;
    theme: "light" | "dark";
}

const initialState: IState = {
    fistName: "",
    secondName: "",
    theme: "light",
};

export const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        serviceFirstNameUpdate: (state, action) => {
            state.fistName = action.payload;
        },
        serviceSecondNameUpdate: (state, action) => {
            state.secondName = action.payload;
        },
        serviceChangeTheme: (state) => {
            if (state.theme === "light") {
                state.theme = "dark";
            } else {
                state.theme = "light";
            }
        },
    },
});

const { actions } = serviceSlice;
const { serviceFirstNameUpdate, serviceSecondNameUpdate, serviceChangeTheme } =
    actions;

const setFirstName = (payload: string) => (dispatch: AppDispatch) => {
    dispatch(serviceFirstNameUpdate(payload));
};

const setSecondName = (payload: string) => (dispatch: AppDispatch) => {
    dispatch(serviceSecondNameUpdate(payload));
};

const changeTheme = () => (dispatch: AppDispatch) => {
    dispatch(serviceChangeTheme());
};

const getFirstUserName = () => (state: RootState) => {
    return state.service.fistName;
};

const getSecondUserName = () => (state: RootState) => {
    return state.service.secondName;
};

const getTheme = () => (state: RootState) => {
    return state.service.theme;
};

export const serviceActions = {
    setFirstName,
    setSecondName,
    changeTheme,
    getFirstUserName,
    getSecondUserName,
    getTheme,
};

export default serviceSlice.reducer;
