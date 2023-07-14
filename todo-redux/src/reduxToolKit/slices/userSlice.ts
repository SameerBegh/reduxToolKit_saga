import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../utility/types";


const initialState: UserState = {
    users: [],
    isLoading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state) => {
            state.isLoading = true
        },
        getUserSuccess: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },
        getUserFailure: (state) => {
            state.isLoading = false;
        },
        deleteUsers: (state) => {
            state.users = []
        }
    }
});

export const { getUser, getUserSuccess, getUserFailure, deleteUsers } = userSlice.actions
export default userSlice.reducer