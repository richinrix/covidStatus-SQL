import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import "./login.css";
import axios from "axios";
// import express from 'express'
//images
import adminimg from "./people.gif";

export class login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userMail: "",
      redirect: false,
      CrrctPass: true,
      userData: [],
    };
  }

  componentDidMount() {
    fetch("/express/userdata")
      .then((res) => res.json())
      .then((userData) =>
        this.setState({ userData }, () =>
          console.log("data fetched: , userData", userData[0])
        )
      );
  }
  //setting password onchange in inputbox
  setPass = (event) => {
    this.setState({ userPassword: event.target.value });
  };
  //validation of password
  check = () => {
    document.getElementById("existinguser").className = "hidden";
    if (this.state.userMail == "" || this.state.userName == "") {
      document.getElementById("wrongcreds").className = "hidden";
      document.getElementById("nocred").className = "";
    } else {
      let checking = false;
      for (let i = 0; i < this.state.userData.length; i++) {
        if (
          this.state.userData[i][this.state.userMail] &&
          this.state.userData[i][this.state.userMail] == this.state.userName
        ) {
          checking = true;
          fetch(
            `/express/loggingin?username='${this.state.userName}'&email='${this.state.userMail}'`
          );
          console.log(
            `/express/loggingin?username='${this.state.userName}'&email='${this.state.userMail}'`
          );
          this.setState({ redirect: true });
        }
      }
      if (!checking) {
        document.getElementById("nocred").className = "hidden";
        const wrongCred = document.getElementById("wrongcreds");
        let timing = true;
        window.setTimeout(() => {
          if (timing) {
            timing = false;
            wrongCred.className = "";
          } else {
            wrongCred.className = "hidden";
            timing = true;
          }
        }, 500);
      }
    }
  };
  setusername = (event) => {
    this.setState({ userName: event.target.value });
  };
  setmail = (event) => {
    this.setState({ userMail: event.target.value });
  };
  handleKeypress = (e) => {
    this.check();
  };
  singingUP = () => {
    if (this.state.userMail == "" || this.state.userName == "") {
      document.getElementById("wrongcreds").className = "hidden";
      document.getElementById("nocred").className = "";
      document.getElementById("existinguser").className = "hidden";
    } else {
      document.getElementById("wrongcreds").className = "hidden";
      document.getElementById("nocred").className = "hidden";
      document.getElementById("existinguser").className = "hidden";
      let existingUser = false;
      for (let i = 0; i < this.state.userData.length; i++) {
        if (
          this.state.userData[i][this.state.userMail] ||
          this.state.userData[i][this.state.userName]
        ) {
          existingUser = true;
          document.getElementById("existinguser").className = "";
        }
      }

      if (!existingUser) {
        fetch(
          `/express/datareading?username='${this.state.userName}'&email='${this.state.userMail}'`
        );
        fetch(
          `/express/loggingin?username='${this.state.userName}'&email='${this.state.userMail}'`
        );
        window.setTimeout(() => {
          document.getElementById("signedUp").className = "";
        }, 500);
        window.setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
    }
  };

  render() {
    const redirect = this.state.redirect;

    if (redirect) {
      return <Redirect to="/newsletter" />;
    }
    return (
      <div className="inputbox">
        <img className="people" src={adminimg} alt="" />
        <div className="row1">
          <h3>Username : </h3>
          <input
            className="input"
            type="text"
            placeholder="enter the username"
            onChange={this.setusername}
          />
        </div>

        <div className="row2">
          <h3>Email id &nbsp;&nbsp; : </h3>
          <input
            type="text"
            className="input"
            placeholder="enter the email"
            onChange={this.setmail}
            // onKeyPress={this.handleKeypress}
          />
        </div>

        <div className="loginbtns">
          <button className="loginBtn" onClick={this.handleKeypress}>
            Login
          </button>
          <button className="subBtn loginBtn " onClick={this.singingUP}>
            Sign Up
          </button>
        </div>
        <div id="wrongcreds" className=" hidden">
          Wrong credentials! <br />
          If you are a new user try signing up{" "}
        </div>
        <div id="nocred" className="hidden">
          Enter Credentials!!
        </div>
        <div id="existinguser" className="hidden">
          Existing User! Username or Email already exists. Please Login!
        </div>
        <div id="signedUp" className="hidden">
          Signed Up Successfully {"\n"} You Can Login In Now
        </div>
      </div>
    );
  }
}

export default login;
