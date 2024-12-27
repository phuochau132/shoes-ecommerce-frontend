import { BreadcrumbItemType } from '@/components/commons/breadcrumb';
import { ProductType } from '@/types/product';
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
  accountSidebarState: boolean;
  menuSidebarState: boolean;
  filterSidebarState: boolean;
  cartSidebarState: boolean;
  pageInfo: PageInfo;
  quickViewInfo: {
    isShowed: boolean;
    product: ProductType | null;
  };
};

const initialState: InitialStateProps = {
  theme: (localStorage.getItem('theme') as THEME) || THEME.LIGHT,
  searchPopupState: false,
  accountSidebarState: false,
  menuSidebarState: false,
  filterSidebarState: false,
  cartSidebarState: false,
  pageInfo: {
    breadcrumb: null,
    title: null,
    description: null
  },
  quickViewInfo: {
    product: null,
    isShowed: false
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
    setAccountSidebarState: (state, action) => {
      state.accountSidebarState = action.payload;
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
    },
    setQuickViewPopup: (state, action) => {
      state.quickViewInfo = action.payload;
    }
  }
});

export const {
  setTheme,
  setSearchPopupState,
  setAccountSidebarState,
  setMenuSidebarState,
  setFilterSidebarState,
  setCartSidebarState,
  setPageInfo,
  setQuickViewPopup
} = appSlice.actions;

const rootReducer = {
  app: appSlice.reducer
};

export default rootReducer;
