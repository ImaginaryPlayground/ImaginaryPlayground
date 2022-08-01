import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const loginUserDataReducer = (
  state = {
    email: "jimdac@naver.com",
    username: "우영우",
    join_date: "2022-07-31",
    modified_date: "2022-07-31",
    hospital_id: 1,
    hospital_name: "순천향병원",
    hospital_address: "인천광역시 부평구 동수로 56-(부평동)",
  },
  action
) => {
  switch (action.type) {
    case "SET_LOGIN_USER":
      return action.data;
    default:
      return state;
  }
};

const selectedKidReducer = (state = null, action) => {
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

const QnaPageSelectedDataReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_SELECTED_QNADATA":
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
  QnaPageSelectedDataReducer,
  loginUserDataReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
