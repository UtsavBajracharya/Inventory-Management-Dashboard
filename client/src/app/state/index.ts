// Reducer, global state that has functions to determine darkmode and if the sidebar is collapsed or open

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialStateTypes {
    isDarkMode: boolean;
    isSidebarCollapsed: boolean;
}

const initialState: InitialStateTypes = {
    isDarkMode: false,
    isSidebarCollapsed: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
      setIsDarkMode: (state, action: PayloadAction<boolean>) => {
        state.isDarkMode = action.payload;
      },
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsSidebarCollapsed } = globalSlice.actions;

export default globalSlice.reducer;