import React, { Component } from 'react';
import _ from 'lodash';
import NotificationSystem from 'react-notification-system';
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Table from "./common/table";
import {getUsers, deleteUser} from '../services/userService';
import auth from '../services/authService';

class Users extends Component {
    notificationSystem = React.createRef();

    columns = [
        {
          path: "name",
          label: "Name"
        },
        {
          path: "email",
          label: "Email"
        },
        {
          path: "username",
          label: "Username"
        },
        {
          path: "role",
          label: "Role"
        },
        {
            key: "delete",
            content: user => (
              <button
                onClick={() => this.handleDelete(user)}
                className={user.role === 'ADMIN' ? 'btn btn-danger btn-sm disabled' : 'btn-danger btn-sm'}
                >
                Delete
              </button>
            )
          }
      ]

      state = {
        users : [],
        currentPage: 1,
        pageSize: 7,
        sortColumn: { path: "name", order: "asc" }
      }

      handleDelete = async user => {
        const notification = this.notificationSystem.current;
        if(user.role == 'ADMIN'){
            notification.addNotification({
                message: 'Admin can not be deleted!',
                level: 'error'
            });
            return;
        }
        const users = this.state.users.filter(m => m._id !== user._id);
        this.setState({ users });
        try{
          await deleteUser(user._id);
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
        const sorted = _.orderBy(this.state.users, [sortColumn.path], [sortColumn.order]);
        return sorted;
      }

      async componentDidMount(){
        const {data} = await getUsers();
        this.setState({users: data});
      }

      handlePageChange = page => {
        this.setState({ currentPage: page });
      };

      getPagedData = () => {
        const {
          pageSize,
          currentPage,
          sortColumn,
          users: allUsers
        } = this.state;

        const sorted = _.orderBy(allUsers, [sortColumn.path], [sortColumn.order]);

        const users = paginate(sorted, currentPage, pageSize);

        return { data: users, totalCount: allUsers.length };
      };


    render() {
    const {data, totalCount} = this.getPagedData();
    const {pageSize, currentPage} = this.state;
    return (
      <div className="users">
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
    );
  }
}

export default Users;