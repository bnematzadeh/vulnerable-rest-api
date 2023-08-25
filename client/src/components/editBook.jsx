import React from 'react';
import  Joi  from 'joi-browser';
import NotificationSystem from 'react-notification-system';
import Form from './common/form';
import { getCategories } from '../services/categoryService';
import { updateBook } from '../services/bookService';
import {getAuthors} from '../services/authorService';

class EditBook extends Form {
    notificationSystem = React.createRef();
    state = {
        data: { title: "", author: "", category: "", publishedDate: "" },
        errors: {},
        authors: [],
        categories: []
      };

      async componentDidMount() {
        const {data: categories} = await getCategories();
        const {data: authors} = await getAuthors();
        this.setState({categories, authors});
      }

      schema = {
        title: Joi.string()
          .required()
          .min(4)
          .label("Title"),
        category: Joi.string()
            .required(),
        author: Joi.string()
          .required()
          .min(4)
          .label("Author"),
        publishedDate: Joi.string()
          .required()
          .label("Date")
      };

    doSubmit = async () => {
          const bookId = this.props.match.params.bookId;
          const {data: book} = this.state;
          const notification = this.notificationSystem.current;
          try{
            await updateBook(bookId, book);
            notification.addNotification({
              message: 'Updated Successfully!',
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
            <h1 className="fw-bold mb-5">Edit Book</h1>
            <div className="col mb-4">
              {this.renderInput("title", "Title")}
              {this.renderSelect("author", "Author", this.state.authors)}
              {this.renderSelect("category","Category" ,this.state.categories)}
              {this.renderInput("publishedDate", "Date")}
              {this.renderButton("Update")}
              <NotificationSystem ref={this.notificationSystem} />
            </div>
            </form>
          </div>
        );
      }
    }

export default EditBook;