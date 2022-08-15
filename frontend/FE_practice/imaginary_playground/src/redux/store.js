import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";


const loginUserDataReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_LOGIN_USER":
      return action.data;
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  loginUserDataReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
