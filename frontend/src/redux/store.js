import vegetableReducer from "./index.js";
import {thunk} from "redux-thunk";
import {persistStore ,persistReducer} from "redux-persist";
import { createStore,applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig={
    key:"veggg-root",
    storage
};

// jobSeekerReducer is a root reducer
// persisterReducer take rootReducer and use it to = make persisted reducer and further persisted reducer is used ti create a persistStore;


const persistedReducer=persistReducer(persistConfig,vegetableReducer);
const store = configureStore({
    reducer: persistedReducer,
  });
const persistor=persistStore(store);

export {store,persistor};