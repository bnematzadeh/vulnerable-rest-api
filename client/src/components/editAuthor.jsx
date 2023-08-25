import React from 'react';
import  Joi  from 'joi-browser';
import NotificationSystem from 'react-notification-system';
import Form from './common/form';
import { updateAuthor } from '../services/authorService';

class EditAuthor extends Form {
    notificationSystem = React.createRef();
    state = {
        data: { name: "", email: "", about: "", job: "" },
        errors: {},
        authors: [],
        categories: []
      };

      schema = {
        name: Joi.string()
          .required()
          .min(4)
          .label("Name"),
        email: Joi.string()
            .email()
            .required(),
        about: Joi.string()
          .required()
          .min(5)
          .label("about"),
        job: Joi.string()
          .required()
          .label("Job")
      };

    doSubmit = async () => {
          const authorId = this.props.match.params.authorId;
          const {data: author} = this.state;
          const notification = this.notificationSystem.current;
          try{
            await updateAuthor(authorId, author);
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
          <div>
            <form onSubmit={this.handleSubmit} className="login">
            <h1 className="fw-bold mb-5">Edit Author</h1>
            <div className="col mb-4">
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email")}
              {this.renderInput("about","About")}
              {this.renderInput("job", "Job")}
              {this.renderButton("Update")}
              <NotificationSystem ref={this.notificationSystem} />
            </div>
            </form>
          </div>
        );
      }
    }

export default EditAuthor;