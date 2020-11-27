import React, { Component } from "react";
import { connect } from "react-redux";
import logo from '../image/wallpaper.jpg';
import { UserList } from "../actions/securityActions";
import axios from "axios";

//import PropTypes from "prop-types";

class SideBar extends Component {

  constructor() {
    super();
   
    this.state = {
      userData: {}
    };
    this.onAction = this.onAction.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    
  }
  
  async  componentDidMount() {
    this.props.UserList();
    const res = await axios.get("http://localhost:8080/users/getUserList");
    console.log("res--->",res.data.data);
    this.setState({userData:res.data.data });

  
  //  this.props.userData=res.data.data;
    console.log("on action--->", this.state.userData.length);

  }
  onAction() {
    console.log("on action--->", this.props.userData);

  }
  componentWillReceiveProps() {
    console.log("compone will recive-->",this.props.userData);

  }


  render() {

    if (this.state.userData.length > 0) {
      var list = <ul className="userList">
        {this.state.userData.map((post, i) => (
          
          <li key={post.userID}>
            <img src={logo} className="imgCir" alt="Canvas Logo" ></img>
            <label className="use-name">{post.userName}</label></li>

        ))}</ul>;
    } else {
      list = <ul className="userList">

        <li>
          <img src={logo} className="imgCir" alt="Canvas Logo" ></img>
          <label className="use-name">static</label></li>
        <li><label>helo</label></li>
        <li><label>First</label></li>

      </ul>;
    }

    return (
      <div className="projects">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-md-3 nopadding">
              <div className="sideBar">
                <div>
                  <label onClick={this.onAction}>Click</label>

                  {/* <ul className="userList">
                          {this.props.userData.userList.map((post, i) => (

<li> 
<img src={logo} className="imgCir" alt="Canvas Logo" ></img>
<label className="use-name">{post}</label></li>

              ))}</ul>
 */}
                  {/* <ul className="userList">
                    <label onClick={this.onAction}>Click</label>

                    <li>
                      <img src={logo} className="imgCir" alt="Canvas Logo" ></img>
                      <label className="use-name">Hello</label></li>
                    <li><label>First</label></li>
                    <li><label>First</label></li>

                  </ul> */}

                  {list}

                </div>

              </div>

              <input type="submit" className="btn btn-info btn-block mt-4" />

            </div>

            <div className="col-md-9">
              <h1 className="display-4 text-center">Dashboard</h1>
              <br />

             This page is secured (visible only to authenticated users)

              <br />
              <hr />

            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  //  console.log(state);
  userData: state.user,

});
export default connect(
  mapStateToProps,
  { SideBar }
)(SideBar);
