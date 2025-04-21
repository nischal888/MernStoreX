import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const userRegistration = createAsyncThunk('/authenticate/register',
  async(formData) =>{
    const response = await axios.post('http://localhost:8000/api/authenticate/register',formData,{
      withCredentials:true
    })
    return response.data
  }
)

const authenticateSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
  },
  extraReducers: (builder)=>{
    builder.addCase(userRegistration.pending,(state)=>{
      state.isLoading = true
    }).addCase(userRegistration.fulfilled,(state)=>{
      state.isLoading =false;
      state.user = null;
      state.isAuthenticated = false;
    }).addCase(userRegistration.rejected,(state)=>{
      state.isLoading =true;
      state.user = null;
      state.isAuthenticated = false;
    })
  }
});

export const { setUserInfo } = authenticateSlice.actions;
export default authenticateSlice.reducer;
