import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authenticateSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
  },
});

export const { setUserInfo } = authenticateSlice.actions;
export default authenticateSlice.reducer;
