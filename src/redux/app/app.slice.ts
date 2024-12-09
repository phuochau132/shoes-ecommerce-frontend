import { BreadcrumbItemType } from '@/components/commons/breadcrumb';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark'
}
type PageInfo = {
  breadcrumb: BreadcrumbItemType[] | null;
  title: string | null;
  description: string | null;
};

export type InitialStateProps = {
  theme: THEME;
  searchPopupState: boolean;
  loginSidebarState: boolean;
  menuSidebarState: boolean;
  filterSidebarState: boolean;
  cartSidebarState: boolean;
  pageInfo: PageInfo;
};

const initialState: InitialStateProps = {
  theme: (localStorage.getItem('theme') as THEME) || THEME.LIGHT,
  searchPopupState: false,
  loginSidebarState: false,
  menuSidebarState: false,
  filterSidebarState: false,
  cartSidebarState: false,
  pageInfo: {
    breadcrumb: null,
    title: null,
    description: null
  }
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
    },
    setCartSidebarState: (state, action) => {
      state.cartSidebarState = action.payload;
    },
    setPageInfo: (state, action) => {
      state.pageInfo = action.payload;
    }
  }
});

export const {
  setTheme,
  setSearchPopupState,
  setLoginSidebarState,
  setMenuSidebarState,
  setFilterSidebarState,
  setCartSidebarState,
  setPageInfo
} = appSlice.actions;

const rootReducer = {
  app: appSlice.reducer
};

export default rootReducer;
