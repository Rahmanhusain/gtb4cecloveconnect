import { createSlice } from "@reduxjs/toolkit";

const initialNotifState = {
    hasNotif: false,
};

const NotifDotSlice = createSlice({
    name: 'NotificationDot',
    initialState: initialNotifState,
    reducers: {
        setHasNotif: (state, action) => {
            state.hasNotif = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setHasNotif } = NotifDotSlice.actions;

export default NotifDotSlice.reducer;