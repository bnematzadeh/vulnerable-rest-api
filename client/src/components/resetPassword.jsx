import React from 'react';
import {Redirect} from "react-router-dom";
import Joi from "joi-browser";
import NotificationSystem from 'react-notification-system';
import Form from "./common/form";
import {sendLink}  from '../services/userService';
import auth from "../services/authService";

class ResetPasswordForm extends Form{
  notificationSystem = React.createRef();
    state = {
        data: { username: ""},
        errors: {}
    }

    schema = {
        username: Joi.string()
          .required()
          .label("Username")
      };

    doSubmit = async () => {
      const notification = this.notificationSystem.current;
        try{
            const {data} = this.state;
            await sendLink(data);
            notification.addNotification({
              message: 'We have sent a rest password link to your email address!',
              level: 'success'
            });
         }catch(ex){
          if(ex.response && ex.response.status === 500){
            notification.addNotification({
              message: ex.response.data,
              level: 'error'
            });
          }
        }
      };

    render(){
        if(auth.getUser()) return <Redirect to={`/profile/${auth.getUser().username}`}/>
        return (
        <div>
            <form onSubmit={this.handleSubmit} className="login">
            <h1 className="fw-bold mb-5">Reset Password</h1>
            <div className="col mb-4">
                {this.renderInput("username", "Username")}
                {this.renderButton("Send Link")}
            </div>
            <NotificationSystem ref={this.notificationSystem} />
        </form>
      </div>
        );
    }
}

export default ResetPasswordForm;