import { createStore } from "redux";
const selectedKidReducer = (state, action) => {
  //const new_selectedKid = {};

  switch (action.type) {
    case "SET_SELECTED_KID":
      return action.data;
    default:
      return state;
  }
};
export const selectedkidStore = createStore(selectedKidReducer);
