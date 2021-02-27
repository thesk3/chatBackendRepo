
import React, { Component } from "react";
import { connect } from "react-redux";
import { SendMsg } from "../actions/securityActions";
import store from "../store";

import MessageInput from "./MessageInput";
// import axios from "axios";
// import { GET_ERRORS, SET_CURRENT_USER,USER_LIST } from "../actions/types";

//import PropTypes from "prop-types";

class ChatWindow extends Component {

  constructor() {
    super();
   
    this.state = {
      userData: {},
      showData:false,
      typedMsg:""
    };
    this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.scrollToBottom= this.scrollToBottom.bind(this);
  }
  
    componentDidMount() {
    console.log("chat windows--->", this.props.data);
    this.scrollToBottom();

  } 
  scrollToBottom = () => {
    console.log("in scroll");
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
   handleChange(event) {
    this.setState({typedMsg: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const state = store.getState();  

    const { user, security } = state;

    console.log("this.user security-->",user,security)

    
    //let toID=Integer.parseInt(security.user.id);
    var  toID = parseInt(security.user.id, 10);
    
    var data={
      from:user.openUser.listID,
      to:toID,
      text: this.state.typedMsg
    }
    console.log('data sendet-->: ' , data);
    this.props.SendMsg(data);
    this.setState({typedMsg: ""});

  }

  componentWillReceiveProps() {
    console.log("chat windows recive--->", this.props.data);
    console.log("chat windows userdata--->", this.props.userDataC);
    
  }
  

  render() {
    if(this.props.userDataC!=null){
      var userInfo=<div className="userChatName">
        <h4>{this.props.userDataC.userName}</h4>
      </div>
    }else{

    }
   
   
    if (this.props.data!==undefined ) {
//        console.log("data in html--->",this.props.data);
    var msg=<div>{this.props.data.dataShow===true? 
    <div>
    <div>
          {this.props.data.data.map((post, i) => (

               
          <div  key={i}>{post.userMsg?<div className="left-text">
            <label className="right-msg-bg">{post.text}</label></div>:<div className=" right-text right " ><label className="left-msg-bg">{post.text}</label></div>}</div>
            ))}    
            
                          </div>
                          
                          <form className="Message" onSubmit={this.handleSubmit}>
       <input
        className="Message__input"
        onChange={this.handleChange}
        value={this.state.typedMsg} // 
        placeholder="write a message"
      />
    </form>

    {/* <MessageInput/> */}
                          </div>
    
    :('') }</div>
    }
    else{
       msg= <div className="center-text"><h4>Select User To Send Msg</h4></div>
    }
    return (
      <div className="projects">
        {/* {userInfo} */}

        <div>

        {msg }

        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>

        </div>
          
      

      </div>
    );
  }
}


const mapStateToProps = state => ({
  //  console.log(state);
  data: state.user.msg,

});
export default connect(
  mapStateToProps,
  {SendMsg  }
)(ChatWindow);

// const ChatWindow = ({data  }) => {
//   return (
//     <div className="ChatWindow">
            
//             {data==true? <h1>Show Data</h1>:('') }

//     </div>
//   );
// };

// export default ChatWindow;