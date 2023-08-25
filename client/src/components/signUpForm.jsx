import React from "react";
import Joi from "joi-browser";
import { Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import Form from "./common/form";
import { register } from "../services/userService";
import auth from "../services/authService";
import "../App.css";

class RegisterForm extends Form {
  notificationSystem = React.createRef();
  state = {
    data: { email: "", password: "", name: "", username: ""},
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    username: Joi.string()
      .required()
      .min(5)
      .label("Username")
  };

  cdm

  doSubmit = async () => {
    const notification = this.notificationSystem.current;
    const query = this.props.location.search;
    const params = new URLSearchParams(query);
    try{
      await register(this.state.data, params.get('ref'));
      notification.addNotification({
        message: 'Registered Successfully!',
        level: 'success'
      });

      window.setTimeout(()=>{
        window.location = '/login';
      },2000)

      }catch(ex){
      if(ex.response && ex.response.status === 400){
        notification.addNotification({
          message: ex.response.data,
          level: 'error'
        });
      }
    }
  };

  render() {
    if(auth.getUser()) return <Redirect to="/"/>
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="register">
        <h1 className="fw-bold mb-5">Sign Up</h1>
        <div className="col mb-4">
          {this.renderInput("email", "Email")}
          {this.renderInput("name", "Name")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Sign Up")}
        </div>
        </form>
        <NotificationSystem ref={this.notificationSystem} />
      </div>
    );
  }
}

export default RegisterForm;
