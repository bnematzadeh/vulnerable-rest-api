import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';
import NotificationSystem from 'react-notification-system';
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Table from "./common/table";
import { getAuthors, deleteAuthor } from "../services/authorService";
import auth from '../services/authService';

class Authors extends Component {
  notificationSystem = React.createRef();
  constructor(){
    super();
    const user = auth.getUser();
    if(user && user.role == 'ADMIN'){
        this.columns.push(this.updateColumn,this.deleteColumn);
    }
  }

  updateColumn = {
    key: "update",
    content: author => (
      <Link to={`/authors/${author._id}`}>
          <button
          className="btn btn-primary btn-sm">Update</button>
      </Link>

  )
  }

  deleteColumn = {
    key: "delete",
    content: author => (
      <button
        onClick={() => this.handleDelete(author)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  }
  columns = [
    {
      path: "name",
      label: "Name"
    },
    { path: "about", label: "About" },
    { path: "job", label: "Job" }
  ]

  state = {
    authors : [],
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "title", order: "asc" }
  }

  handleDelete = async author => {
    const notification = this.notificationSystem.current;
    const authors = this.state.authors.filter(m => m._id !== author._id);
    this.setState({ authors });
    try{
      await deleteAuthor(author._id);
      notification.addNotification({
        message: 'Deleted Successfully',
        level: 'success'
      });
    }catch(ex){
      if(ex.response && ex.response.status === 400){
        notification.addNotification({
          message: ex.response.data,
          level: 'error'
        });
    }
  };
}

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getSortedData = ()=>{
    const {sortColumn} = this.state;
    const sorted = _.orderBy(this.state.authors, [sortColumn.path], [sortColumn.order]);
    return sorted;
  }

  async componentDidMount(){
    const {data} = await getAuthors();
    this.setState({authors: data});
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      authors: allAuthors
    } = this.state;

    const sorted = _.orderBy(allAuthors, [sortColumn.path], [sortColumn.order]);

    const authors = paginate(sorted, currentPage, pageSize);

    return { data: authors, totalCount: allAuthors.length };
  };


  render(){
    const {data, totalCount} = this.getPagedData();
    const {pageSize, currentPage} = this.state;
    return (
      <div className="row authors">
        <div className="col">
      <Table
        columns={this.columns}
        data={data}
        sortColumn={this.state.sortColumn}
        onDelete={this.handleDelete}
        onSort={this.handleSort}
      />
      <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
      />
      <NotificationSystem ref={this.notificationSystem} />
      </div>
    </div>
    );
  }
};

export default Authors;
