import React, { Component } from "react";
import Link from "react-router-dom/Link";
import Table from "./common/table";
import auth from '../services/authService';

class booksTable extends Component {

  constructor(){
    super();
    const user = auth.getUser();
    if(user && user.role == 'ADMIN'){
        this.columns.push(this.updateColumn, this.deleteColumn);
    }
  }

  updateColumn = {
    key: "update",
    content: book => (
        <Link to={`/books/${book._id}`}>
            <button
            className="btn btn-primary btn-sm">Update</button>
        </Link>

    )
  }

  deleteColumn = {
    key: "delete",
    content: book => (
      <button
        onClick={() => this.props.onDelete(book)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  }

  columns = [
    {
      path: "title",
      label: "Title"
    },
    {
      path: "author.name",
      label: "Author"
    },
    { path: "category.name", label: "Category" },
    { path: "publishedDate", label: "Published Date" }
  ];

  render() {
    const { books, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={books}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default booksTable;
