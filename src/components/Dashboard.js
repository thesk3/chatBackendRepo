import React, { Component } from "react";
import { connect } from "react-redux";
import logo from '../image/wallpaper.jpg';
import { UserList,UserMessages,addToUserList } from "../actions/securityActions";
import axios from "axios";
import ChatWindow from "./ChatWindow"
import {OPEN_CHAT_USER } from "../actions/types";
import store from "../store";
//import MediaQuery from 'react-responsive';

import "./MessageInput.css";

//import PropTypes from "prop-types";

class Dashboard extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
      userData: {},
      showData:false,
      addUserUI:false,
      name:"name",
      id:0,
      showSide:true,
      showMain:true,
      tabUserID:0,
      userSelect:{}
      
    };
    this.onAction = this.onAction.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSideBar= this.showSideBar.bind(this);
    this.showMainBar= this.showMainBar.bind(this);
    this.selectedUseTab= this.selectedUseTab.bind(this);
    
        
  }
  
  async  componentDidMount() {
    const state = store.getState();
    const { security } = state;
    var  toID = parseInt(security.user.id, 10);

    var returndata=this.props.UserList(toID);
    const res = await axios.get("http://localhost:8080/users/getUserList", {
      params: {
        id :toID
            }});
console.log("id--->",toID);
    this.setState({userData:res.data.data });
     
  
  //  this.props.userData=res.data.data;
//    console.log("data--->", this.state.userData.length);

  }
  onAction= (data) => {
    console.log("on action--->", data);
    const state = store.getState();
    const { security } = state;
    var  toID = parseInt(security.user.id, 10);
 
      var senddata={
        from:toID,
        to:data.userID
      }
      console.log("store-->",senddata);

    this.setState({showData:true });
    this.setState({showSide: this.state.showSide?false:true});
  
    this.props.UserMessages(senddata);

      const interval = setInterval(() => {
        if (true) {
        //  console.log("in interva")
        window.scrollTo(0, 0);

        // uncemnet below line to make contoinus live msg
        // this.props.UserMessages(senddata);
          //clearInterval(interval);
        };
      }, 3000);


    store.dispatch({
       type: OPEN_CHAT_USER,
       payload: data
     })

  } 
   addToUSerList= () => {
     console.log("add to user--->");
     
    this.setState({addUserUI: this.state.addUserUI?false:true});
     
  }
  selectedUseTab= (user) => {
    console.log("tab user--->");
    
    this.setState({tabUserID: user.userID});
    this.setState({userSelect: user});
    
 }
 
  
  handleChangeName(event) {
    console.log("in name",event.target);

    this.setState({name: event.target.value});
   }
   handleChangeId(event) {
    console.log("in id",event.target.id);

    this.setState({id: event.target.value});
   }
   
   async handleSubmit(event) {
    event.preventDefault();
    console.log('A name was submitted: ' , this.state);

    const state = store.getState();
    const { security } = state;
    var  toID = parseInt(security.user.id, 10);
    var  listID = parseInt(this.state.id, 10);
 
      var senddata={
        userID:toID,
        listID,
        name:this.state.name,

        
      }
      await this.props.addToUserList(senddata);
      console.log("state-->",store.getState());
      this.setState({userData: store.getState().user.userList});
          
      console.log("add to user--->",this.state.userData);
    //close add user bar after success
      this.setState({addUserUI: this.state.addUserUI?false:true});




  }
  componentWillReceiveProps() {
    //console.log("compone will recive-->",this.props.userData);

  }

  showSideBar(){
    //this.setState({showSide: this.state.showSide?false:true});
    
  }
  showMainBar(){
    console.log("ist main--> ",this.state.showMain);
    //this.setState({showMain: this.state.showMain?false:true});
    
  }

  render() {
    if(this.state.userSelect!=null){
      var userInfo=<div className="userChatName">
        <h4>{this.state.userSelect.userName}</h4>
      </div>
    }else{

    }
   
    if (this.state.userData.length > 0) {
      var list = <ul className="userList">
        {this.state.userData.map((post, i) => (
          
          <li className={ this.state.tabUserID==post.userID ? 'liclass--active': '' }  onClick={() =>this.selectedUseTab(post)} key={post.userID} >
            <img src={logo} className="imgCir" alt="Canvas Logo" ></img>
            <label className="use-name" onClick={() =>this.onAction(post)}>{post.userName}</label></li>

        ))}</ul>;
    } else {
      list = <ul className="userList">

        <li>
          <img src={logo} className="imgCir" alt="Canvas Logo" ></img>
          <label className="use-name">static</label></li>

      </ul>;
     
    }
    if( this.state.addUserUI  ){
      var addUser =<div>

<form className="Message pad-9" onSubmit={this.handleSubmit}>

<div className="form-group">

<input
      className="form-control input-sm"
        onChange={this.handleChangeId}
        value={this.state.id}  
        placeholder="Id"
      />
  
</div>

      	<div className="form-group">
        <input
      className="form-control input-sm"
      onChange={this.handleChangeName}
      value={this.state.name}  
      placeholder="Name"
    />

					</div>
    <button type="submit" className="btn btn-primary c-btn">Add User</button>
    </form>

      </div>
    }else{
      addUser=<div></div>
    }

    if(this.state.showSide){
      var side=<div></div>
    }else{
       side=<div>hide side bar </div>

    }
    if(this.state.showMain){
      var main=     <ChatWindow data={this.state.showData}/>
    }else{
       main=<div>hide  minabar</div>

    }


    return (
      <div className="projects">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-md-3 nopadding asd ">
       
            <div className="sideBar">
          
          <div>
    <div style={{textAlign:"center",padding:"9px"}}><label onClick={() =>this.addToUSerList()}>
    {this.state.addUserUI?"Cancel ":"Add User"}</label></div>
    
        
                  {addUser}
            {list}
    
          </div>
    
        </div>
    
            </div>

            <div className="col-md-9 cus-sc side-chat">

 
              {userInfo}

              <ChatWindow data={this.state.showData} userDataC={this.state.userSelect}/>
              <br />
              <hr />

            </div>

            
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  //  console.log(state);
  userData: state.user,

});
export default connect(
  mapStateToProps,
  { UserList,UserMessages,addToUserList }
)(Dashboard);
