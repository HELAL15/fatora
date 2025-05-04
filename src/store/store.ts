import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
// import Cookies from 'js-cookie'
// import  CookieStorage  from 'redux-persist-cookie-storage'
// @ts-expect-error CookieStorage type definitions are incomplete
import createIndexedDBStorage from 'redux-persist-indexeddb-storage';
import UserSlice from './features/UserSlice';
import sellingInvoiceSlice from './features/addSellingInvoiceSlice'
import designInvoiceSlice from './features/designInvoiceSlice'

// Combine Reducers
const rootReducer = combineReducers({ 
  user: UserSlice,
  sellingInvoice:sellingInvoiceSlice,
  designInvoice:designInvoiceSlice,
});

// const cookieStorage = new CookieStorage({
//   cookies: Cookies,
//   setCookieOptions: {
//     secure: true,
//     sameSite: "strict",
//     path: "/",
//   },
// });
// Create IndexedDB storage
const storage = createIndexedDBStorage({
  name: 'MyAppDB',
  storeName: 'reduxStore',
  version: 1,
});
const persistConfig = {
  key: 'root',
  storage:  storage,
  whitelist: ['sellingInvoice','designInvoice'],
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.VITE_NODE_ENV === 'development',
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
