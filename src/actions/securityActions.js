import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER,USER_LIST,GET_MESSAGES } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    await axios.post("http://localhost:8080/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    // post => Login Request
    const res = await axios.post("http://localhost:8080/api/users/login", LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    }); 
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const UserList = (id) => async dispatch => {
  try {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log("id--->",id);
    const res = await axios.get("http://localhost:8080/users/getUserList", {
      params: {
        id 
            }});
    //console.log("res--->",res.data.data);
     dispatch({
       type: USER_LIST,
       payload: res.data.data
     });
     return  res.data.data;
  } catch (err) {
     dispatch({
       type: GET_ERRORS,
       payload:  err.response.data
     });
  }
};
export const UserMessages= (data) => async dispatch => {
  try {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    const res = await axios.get("http://localhost:8080/users/getUserMessages", {
      params: {
        from : data.from,
        to:data.to
      }});
    //console.log("data--->",res.data);
    var messages={
      data:res.data.data,
      dataShow:true
    }
    
    dispatch({
       type: GET_MESSAGES,
       payload: messages
     });
  
    } catch (err) {
  
    //   dispatch({
    //    type: GET_ERRORS,
    //    payload:  err.response.data
    //  });
  }
};
export const SendMsg= (data) => async dispatch => {
  try {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log("in send msg data--->",data);

    const res = await axios.post("http://localhost:8080/users/SendMsg",data);
    console.log("data--->",res.data);
    var messages={
      data:res.data.data,
      dataShow:true
    }
    
    dispatch({
       type: GET_MESSAGES,
       payload: messages
     });
  
    } catch (err) {
  
    //   dispatch({
    //    type: GET_ERRORS,
    //    payload:  err.response.data
    //  });
  }
};


export const addToUserList= (data) => async dispatch => {
  try {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log("in add user list--->",data);

    const res = await axios.post("http://localhost:8080/users/addToUserList",data);
    console.log("data--->",res.data);
    console.log("after data--->");

    // var userList={
    //   data:res.data.data,
    //   dataShow:true
    // }
    
    dispatch({
      type: USER_LIST,
      payload: res.data.data
    });
    return  res.data.data;


    } catch (err) {
  
    //   dispatch({
    //    type: GET_ERRORS,
    //    payload:  err.response.data
    //  });
  }
};



export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
