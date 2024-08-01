import { createSlice } from '@reduxjs/toolkit';



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: {},
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      localStorage.removeItem('userData');
    },
  },
});

// save the state to local storage
const saveStateToLocalStorage = (state) => {
  if (state.isLoggedIn) {
    localStorage.setItem('userData', JSON.stringify(state.userData));
  } else {
    localStorage.removeItem('userData');
  }
};

// store to save the state to local storage whenever it changes
export const subscribeToStore = (store) => {
  store.subscribe(() => {
    const state = store.getState();
    saveStateToLocalStorage(state.auth);
  });
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;