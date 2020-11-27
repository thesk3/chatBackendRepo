import React from "react";
import store from "../store";
import "./MessageInput.css";

import { SET_TYPING_VALUE, sendMessage } from "../actions/types";

const MessageInput = ({ value }) => {
//first retrieve the current state object

const handleSubmit = e => {
  e.preventDefault();
  const state = store.getState();  

    const { user, security } = state;

    console.log("this.props-->",)
    // store.dispatch({
    //       type:  MSG,
    //       cartData: res.data.data
    //    })

  //  store.dispatch(sendMessage(typing, activeUserId));
  };
  const handleChange = e => {
    store.dispatch({
      type: SET_TYPING_VALUE,
      payload: e.target.value
    });
    
  };

  return (
    <form className="Message" onSubmit={handleSubmit}>
      <input
        className="Message__input"
        onChange={handleChange}
        value={value}
        placeholder="write a message"
      />
    </form>
  );
};

export default MessageInput;