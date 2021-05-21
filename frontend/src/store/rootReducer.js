import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import notifierSlice from "./slices/notifierSlice";
import cocktailsSlice from "./slices/cocktailsSlice";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  notifier: notifierSlice.reducer,
  cocktails: cocktailsSlice.reducer
});

export default rootReducer;