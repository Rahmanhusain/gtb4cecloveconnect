import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const FullProfileSlice = createSlice({
    name: "FullProfileSlice",
    initialState,
    reducers: {
        SetFullProfileData: (state, action) => {
            return { ...state, ...action.payload };
        },
        ResetFullProfileData: () => initialState,
    },
});

// Action creators are generated for each case reducer function
export const { SetFullProfileData, ResetFullProfileData } = FullProfileSlice.actions;

export default FullProfileSlice.reducer;