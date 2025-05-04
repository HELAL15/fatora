import { createSlice } from '@reduxjs/toolkit';


// Initial state
const initialState = {
  data: {},
};

// Create the User Slice
const designInvoiceSlice = createSlice({
  name: 'designInvoice',
  initialState,
  reducers: {
    setInvoiceDesign: (state, action) => {
      state.data = action.payload;
    },
    removeInvoice: (state) => {
      state.data = {};
    },
    
  },
});

// Export actions and reducer
export const { removeInvoice , setInvoiceDesign } = designInvoiceSlice.actions;
export default designInvoiceSlice.reducer;