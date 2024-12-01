import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark'
}

type InitialStateProps = {
  theme: THEME;
  searchPopupState: boolean;
  loginSidebarState: boolean;
  menuSidebarState: boolean;
  filterSidebarState: boolean;
};

const initialState: InitialStateProps = {
  theme: (localStorage.getItem('theme') as THEME) || THEME.LIGHT,
  searchPopupState: false,
  loginSidebarState: false,
  menuSidebarState: false,
  filterSidebarState: false
};

export const appSlice = createSlice({
  initialState: initialState,
  name: 'app',
  reducers: {
    setTheme: (state, action: PayloadAction<THEME>) => {
      state.theme = action.payload;
    },
    setSearchPopupState: (state, action) => {
      state.searchPopupState = action.payload;
    },
    setLoginSidebarState: (state, action) => {
      state.loginSidebarState = action.payload;
    },
    setMenuSidebarState: (state, action) => {
      state.menuSidebarState = action.payload;
    },
    setFilterSidebarState: (state, action) => {
      state.filterSidebarState = action.payload;
    }
  }
});

export const { setTheme, setSearchPopupState, setLoginSidebarState, setMenuSidebarState, setFilterSidebarState } =
  appSlice.actions;

const rootReducer = {
  app: appSlice.reducer
};

export default rootReducer;
