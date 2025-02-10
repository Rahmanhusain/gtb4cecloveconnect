import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        SetUserData: (state, action) => {
            return { ...state, ...action.payload };
        },
        ResetUserData: () => initialState,
    },
});

// Action creators are generated for each case reducer function
export const { SetUserData,ResetUserData  } = UserSlice.actions;

export default UserSlice.reducer;
