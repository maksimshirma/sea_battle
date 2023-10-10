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

export const setName = (payload: string) => (dispatch: AppDispatch) => {
    dispatch(serviceNameUpdate(payload));
};

export const changeTheme = () => (dispatch: AppDispatch) => {
    dispatch(serviceChangeTheme());
};

export const getUserName = () => (state: RootState) => {
    return state.service.name;
};

export const getTheme = () => (state: RootState) => {
    return state.service.theme;
};

export default serviceSlice.reducer;
