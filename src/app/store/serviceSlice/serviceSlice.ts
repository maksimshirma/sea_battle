import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

interface IState {
    name: string;
    theme: "light" | "dark";
}

const initialState: IState = {
    name: "",
    theme: "light",
};

export const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        serviceNameUpdate: (state, action) => {
            state.name = action.payload;
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
const { serviceNameUpdate, serviceChangeTheme } = actions;

const setName = (payload: string) => (dispatch: AppDispatch) => {
    dispatch(serviceNameUpdate(payload));
};

const changeTheme = () => (dispatch: AppDispatch) => {
    dispatch(serviceChangeTheme());
};

const getUserName = () => (state: RootState) => {
    return state.service.name;
};

const getTheme = () => (state: RootState) => {
    return state.service.theme;
};

export const serviceActions = {
    setName,
    changeTheme,
    getUserName,
    getTheme,
};

export default serviceSlice.reducer;
