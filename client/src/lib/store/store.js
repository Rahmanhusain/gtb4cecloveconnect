import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import UserSlice from "./features/UserSlice";
import NotifDotSlice from "./features/NotifDotSlice";

let store;
export const makeStore = () => {
  if (store) {
    return store;
  }
  store= configureStore({
    reducer: {
      Authenticator: AuthSlice,
      UserData: UserSlice,
      NotifData: NotifDotSlice,
    },
  });
  return store;
};

