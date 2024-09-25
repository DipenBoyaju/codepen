import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  token: null,
  expiresAt: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
    },
    removeCredentials: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
      state.expiresAt = null;
    }
  }
})

export const { setCredentials, removeCredentials } = userSlice.actions;
export default userSlice.reducer;