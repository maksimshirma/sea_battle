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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userNameUpdate: (state, action) => {
            state.name = action.payload;
        },
        userChangeTheme: (state) => {
            if (state.theme === "light") {
                state.theme = "dark";
            } else {
                state.theme = "light";
            }
        },
    },
});

const { actions } = userSlice;
const { userNameUpdate, userChangeTheme } = actions;

export const setName = (payload: string) => (dispatch: AppDispatch) => {
    dispatch(userNameUpdate(payload));
};

export const changeTheme = () => (dispatch: AppDispatch) => {
    dispatch(userChangeTheme());
};

export const getUserName = () => (state: RootState) => {
    return state.user.name;
};

export const getTheme = () => (state: RootState) => {
    return state.user.theme;
};

export default userSlice.reducer;
