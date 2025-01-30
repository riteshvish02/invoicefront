import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  loading: false,
  msg: null,
  error: null,
  user:null,
  allinvoice:[]
  
};

export const user = createSlice({
  name: "user", // Name of the slice
  initialState,
  reducers: {
    Request: (state, action) => {
      state.loading = true;
      state.msg = null;
      state.error = null;
    },
    clearMessageUser: (state, action) => {
      state.msg = null;
    },
    clearErrorUser: (state, action) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action?.payload; // Store any errors
      state.loading = false;
      state.isAuthenticated = false;
    },
Success: (state, action) => {
      state.user= action.payload ,
           state.loading = false,
        state.isAuthenticated = true,
        state.message = "user Login",
        state.role = action?.payload.role

    },
    
    logout: (state, action) => {
      state.loading = false,
        state.isAuthenticated = false,
        state.msg= "user Signout"
      
    },
    newinvoice:(state, action) => {
      state.invoice= action?.payload
    },

    getallinvoice:(state, action) => {
      state.loading=false;
      state.allinvoice= action?.payload
    }


   },
})


export default user.reducer; // Export the reducer function

export const {
  setError,logout,Success,Request,newinvoice,getallinvoice
} = user.actions; // Export actions
