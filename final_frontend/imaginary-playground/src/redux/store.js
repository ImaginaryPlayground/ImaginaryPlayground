import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const selectedKidReducer = (state = null, action) => {
  //const new_selectedKid = {};

  switch (action.type) {
    case "SET_SELECTED_KID":
      return action.data;
    default:
      return state;
  }
};

const HomePageCurrentPageReducer = (
  state = { page: 1, scrollY: 0 },
  action
) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
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
  selectedKidReducer,
  HomePageCurrentPageReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
