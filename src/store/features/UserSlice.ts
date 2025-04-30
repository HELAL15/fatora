import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User State
interface UserState {
  data: TableItem[];
  isAuthenticated: boolean;
  loading: boolean;
}
interface TableItem {
  key: string;
  number: string;
  category: string;
  item: string;
  cost: string;
  price: string;
  total: string;
}
// Initial state
const initialState: UserState = {
  data: [],
  isAuthenticated: false,
  loading: false,
};

// Create the User Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TableItem[]>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.data = [];
      state.isAuthenticated = false;
    },
    setUnAuthed : (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Export actions and reducer
export const { setUser, removeUser , setUnAuthed } = userSlice.actions;
export default userSlice.reducer;