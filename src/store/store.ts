import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import Cookies from 'js-cookie'
// @ts-expect-error CookieStorage type definitions are incomplete
import  CookieStorage  from 'redux-persist-cookie-storage'
import UserSlice from './features/UserSlice';
import sellingInvoiceSlice from './features/addSellingInvoiceSlice'


// Combine Reducers
const rootReducer = combineReducers({ 
  user: UserSlice,
  sellingInvoice:sellingInvoiceSlice
});
// const customCookieStorage = {
//   getItem: (key: string) => {
//     return Promise.resolve(Cookies.get(key) || null);
//   },
//   setItem: (key: string, value: string) => {
//     Cookies.set(key, value, {
//       secure: true,
//       sameSite: "strict",
//       path: "/",
//     });
//     return Promise.resolve();
//   },
//   removeItem: (key: string) => {
//     Cookies.remove(key);
//     return Promise.resolve();
//   },
// };
const cookieStorage = new CookieStorage({
  cookies: Cookies,
  setCookieOptions: {
    secure: true,
    sameSite: "strict",
    path: "/",
  },
});
const persistConfig = {
  key: 'root',
  storage:  cookieStorage,
  whitelist: ['sellingInvoice'],
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
