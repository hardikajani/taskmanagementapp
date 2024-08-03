import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/features/auth/authSlice';
import { subscribeToStore } from '../app/features/auth/authSlice';


const loadUserDataFromLocalStorage = () => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      return {
        auth: {
          isLoggedIn: true,
          userData,
        },
      };
    } else {
      return {};
    }
  };
  
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: loadUserDataFromLocalStorage(),
});
subscribeToStore(store);

export default store;