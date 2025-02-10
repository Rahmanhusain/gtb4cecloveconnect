import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  ProfileName: null,
  profilephotosrc:null,
}

const AuthSlice = createSlice({
  name: 'UserEmail',
  initialState,
  reducers: {
    SetUser:(state,action)=>{
      const { email, name,profilephotosrc } = action.payload;
      state.email = email;
      state.ProfileName = name;
      state.profilephotosrc = profilephotosrc;
    }
  },
})

// Action creators are generated for each case reducer function
export const { SetUser } = AuthSlice.actions

export default AuthSlice.reducer