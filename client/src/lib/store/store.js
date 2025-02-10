import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import UserSlice from "./features/UserSlice";


let store;
export const makeStore = () => {
  if (store) {
    return store;
  }
  store= configureStore({
    reducer: {
      Authenticator: AuthSlice,
      UserData: UserSlice,
    },
  });
  return store;
};

