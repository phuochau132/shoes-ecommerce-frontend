import { UserType } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
export const initialState: { user: UserType | null } = {
  user: (() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? (JSON.parse(storedUser) as UserType) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  })()
};

export const userSlice = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      Cookies.remove('access_token');
      location.href = '/';
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

const userReducer = {
  user: userSlice.reducer
};

export default userReducer;
