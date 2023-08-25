import React from "react";
import Joi from "joi-browser";
import NotificationSystem from 'react-notification-system';
import Form from "./common/form";
import auth from '../services/authService';

class AdminLogin extends Form {
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
      await auth.adminLogin(data.username, data.password);

      notification.addNotification({
        message: 'Logged-in Successfully',
        level: 'success'
      });

      window.setTimeout(()=>{
        window.location = state ? state.from.pathname : '/profile/users';
      },2000)

    }catch(ex){
      if(ex.response || ex.response.status === 403 || ex.response.status === 400){
        notification.addNotification({
          message: ex.response.data,
          level: 'error'
        });
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login">
        <h1 className="fw-bold mb-5">Admin Login</h1>
        <div className="col mb-4">
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </div>
        </form>
        <NotificationSystem ref={this.notificationSystem} />
      </div>
    );
  }
}

export default AdminLogin;
