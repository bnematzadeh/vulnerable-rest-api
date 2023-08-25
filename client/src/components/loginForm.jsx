import React from "react";
import {Redirect} from "react-router-dom";
import Joi from "joi-browser";
import NotificationSystem from 'react-notification-system';
import Form from "./common/form";
import auth from "../services/authService";
import {Link } from "react-router-dom";

class LoginForm extends Form {
  notificationSystem = React.createRef();
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

    doSubmit = async () => {
      const notification = this.notificationSystem.current;
      try{

        const {data} = this.state;
        const {state} = this.props.location;
        await auth.login(data.username, data.password);

        notification.addNotification({
          message: 'Logged-in Successfully',
          level: 'success'
        });

        window.setTimeout(()=>{
          window.location = state ? state.from.pathname : '/';
        },2000)

      }catch(ex){
        if(ex.response && ex.response.status === 400){
          notification.addNotification({
            message: 'Invalid Username or Password',
            level: 'error'
          });
        }
      }
    };

  render() {
    if(auth.getUser()) return <Redirect to="/"/>
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login">
        <h1 className="fw-bold mb-5">User Login</h1>
        <div className="col mb-4">
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          <div className="mb-2">
            <Link to="/reset-password">
              Forgot Password?
            </Link>
          </div>
          {this.renderButton("Login")}
          <NotificationSystem ref={this.notificationSystem} />
        </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
