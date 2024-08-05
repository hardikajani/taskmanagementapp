import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/features/auth/authSlice';
import { subscribeToStore } from '../app/features/auth/authSlice';
import { loadUserDataFromLocalStorage } from '../app/features/auth/authSlice';




const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: loadUserDataFromLocalStorage(),
});
subscribeToStore(store);

export default store;