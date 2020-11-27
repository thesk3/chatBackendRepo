import { SET_TYPING_VALUE, OPEN_CHAT_USER,USER_LIST,GET_MESSAGES } from "../actions/types";


const useReducer = (state = [], action) => {
 switch (action.type) {
  case USER_LIST:
    console.log("action--->",action)
  return {
    ...state,
    userList: action.payload
  };
  case GET_MESSAGES:
//    console.log("get mesage--->",action)
    return {
     ...state,
      msg: action.payload
    };
    case  SET_TYPING_VALUE:
      console.log("typed--->",action)
      var data= {
       ...state,
        typed: action.payload
      };
      console.log("data->",data);
      return data;
  
  
      case  OPEN_CHAT_USER:
        console.log("data open chat user--->",action)
        var data= {
         ...state,
          openUser: action.payload
        };
        console.log("data->",data);
        return data;
    
    default:
      return state;
  }
}
export default useReducer;