import { AppDispatch, RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

interface IState {
    theme: "light" | "dark";
}

const initialState: IState = {
    theme: "light",
};

export const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
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
const { serviceChangeTheme } = actions;

const changeTheme = () => (dispatch: AppDispatch) => {
    dispatch(serviceChangeTheme());
};

const getTheme = () => (state: RootState) => {
    return state.service.theme;
};

export const serviceActions = {
    changeTheme,
    getTheme,
};

export default serviceSlice.reducer;
