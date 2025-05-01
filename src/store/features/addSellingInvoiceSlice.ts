import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User State
interface InvoiceState {
  data: TableItem[];
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
const initialState: InvoiceState = {
  data: [],
};

// Create the User Slice
const sellingInvoiceSlice = createSlice({
  name: 'sellingInvoice',
  initialState,
  reducers: {
    setInvoice: (state, action: PayloadAction<TableItem[]>) => {
      state.data = action.payload;
    },
    removeInvoice: (state) => {
      state.data = [];
    },
    removeInvoiceItem: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(item => item.key !== action.payload);
    },
    updateInvoiceItem: (state, action: PayloadAction<TableItem>) => {
      const updatedItem = action.payload;
      const index = state.data.findIndex(item=>item.key === updatedItem.key);
      if(index !== -1){
        state.data[index] = updatedItem;
      }
      // state.data = state.data.map(item =>
      //   item.key === action.payload.key ? action.payload : item
      // );
    },
  },
});

// Export actions and reducer
export const { removeInvoice,removeInvoiceItem , setInvoice,updateInvoiceItem } = sellingInvoiceSlice.actions;
export default sellingInvoiceSlice.reducer;