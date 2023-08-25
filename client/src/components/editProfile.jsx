import React from 'react';
import  Joi  from 'joi-browser';
import NotificationSystem from 'react-notification-system';
import Form from './common/form';
import { updateUser } from '../services/userService';


class EditProfile extends Form {
  notificationSystem = React.createRef();
    state = {
      data: { name: "", email: "", url: "", currentPass: "", newPass: "" },
      errors: {}
    };


    schema = {
      name: Joi.string()
        .required()
        .label("Name"),
      email: Joi.string()
        .required()
        .email()
        .label("Email"),
      url: Joi.string().uri(),
      currentPass: Joi.string()
        .required()
        .min(5)
        .label("Current Password"),
      newPass: Joi.string()
        .required()
        .min(5)
        .label("New Password")
    };

      doSubmit = async () => {
        const notification = this.notificationSystem.current;
            try{
               const {data: user} = this.state;
               console.log(user);
               await updateUser(user);
               notification.addNotification({
                message: 'Updated Successfully',
                level: 'success'
              });
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
      return (
      <div className="card">
            <div className="card-body">
                <form onSubmit={this.handleSubmit} className="edit">
                    <h1 className="fw-bold mb-5">Edit Profile</h1>
                    {this.renderInput("name", "Name")}
                    {this.renderInput("email", "Email")}
                    {this.renderInput("url", "Website")}
                    {this.renderInput("currentPass", "Current Password", "password")}
                    {this.renderInput("newPass", "New Password", "password")}
                    {this.renderButton("Edit")}
                    <NotificationSystem ref={this.notificationSystem} />
                  </form>
              </div>
            </div>
      );
    }
  }

export default EditProfile;