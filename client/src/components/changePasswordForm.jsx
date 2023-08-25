import React from 'react';
import {Redirect} from "react-router-dom";
import Joi from "joi-browser";
import NotificationSystem from 'react-notification-system';
import Form from "./common/form";
import {changePassword}  from '../services/userService';
import auth from "../services/authService";

class changePasswordForm extends Form{
  notificationSystem = React.createRef();
    state = {
        data: { value: ""},
        errors: {}
    }

    schema = {
      value: Joi.string()
          .min(5)
          .required()
      };

    doSubmit = async () => {
      const notification = this.notificationSystem.current;
        try{
            const {data: newPass} = this.state;
            const data = this.props.location.search;
            const params = new URLSearchParams(data);
            if(params.get('userId') && params.get('token')){
              let user =  Object.fromEntries(params.entries())
              await changePassword(newPass, user);
              notification.addNotification({
                message: 'Updated Successfully!',
                level: 'success'
              });
              window.setTimeout(()=>{
                window.location = '/login';
              },2000)
            }else{
              notification.addNotification({
                message: 'userId or token are not allowed to be empty!',
                level: 'error'
              });
            }

         }catch(ex){
          if(ex.response && ex.response.status === 401){
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
            <h1 className="fw-bold mb-5">Change Password</h1>
            <div className="col mb-4">
                {this.renderInput("value", "New Password", "password")}
                {this.renderButton("Update")}
            </div>
            <NotificationSystem ref={this.notificationSystem} />
        </form>
      </div>
        );
    }
}

export default changePasswordForm;