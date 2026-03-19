
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import Slices from "../slice";

const persistConfig = {
  key: "lms",
  storage,
  whitelist: ["report", "product"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, Slices);

const middleWareConfigs = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware(middleWareConfigs),
});

const PersistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export { PersistedStore, store };
