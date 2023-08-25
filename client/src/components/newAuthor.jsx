import React from 'react';
import  Joi  from 'joi-browser';
import NotificationSystem from 'react-notification-system';
import Form from './common/form';
import { addAuthor } from '../services/authorService';

class NewAuthor extends Form {
    notificationSystem = React.createRef();

    state = {
        data: { name: "", email: "", job: "", about: "" },
        errors: {}
      };

      schema = {
        name: Joi.string()
            .required()
            .min(4),
        email: Joi.string()
            .required(),
        job: Joi.string()
          .required()
          .min(4)
          .label("Job"),
        about: Joi.string()
          .required()
          .label("About")
          .min(5)
      };

    doSubmit = async () => {
          const notification = this.notificationSystem.current;
          try{

            const {data: author} = this.state;
            await addAuthor(author);
            notification.addNotification({
              message: 'Added Successfully!',
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
            <h1 className="fw-bold mb-5">Add new Author</h1>
            <div className="col mb-4">
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email")}
              {this.renderInput("job", "Job")}
              {this.renderInput("about", "About")}
              {this.renderButton("Add")}
              <NotificationSystem ref={this.notificationSystem} />
            </div>
            </form>
          </div>
        );
      }
    }

export default NewAuthor;