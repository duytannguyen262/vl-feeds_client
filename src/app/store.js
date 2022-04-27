import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/auth/authSlice";
import filterReducer from "../components/TopBar/filterSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});
export const persistor = persistStore(store);
