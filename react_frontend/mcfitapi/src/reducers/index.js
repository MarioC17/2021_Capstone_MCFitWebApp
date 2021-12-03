import { combineReducers } from "redux";
import auth from "./auth";
import fatSecret from "./fat-secret";

export default combineReducers({
  // auth: auth,
  fatSecret: fatSecret,
});
