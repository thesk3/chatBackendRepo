import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import  useReducer  from "./useReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  user:useReducer
});
