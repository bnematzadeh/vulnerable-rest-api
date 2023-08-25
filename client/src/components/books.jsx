import React, { Component } from "react";
import _ from "lodash";
import NotificationSystem from 'react-notification-system';
import BooksTable from "./booksTable";
import Pagination from "./common/pagination";
import { getBooks, deleteBook } from '../services/bookService';
import { getCategories } from "../services/categoryService";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";

class Books extends Component {
  notificationSystem = React.createRef();
  state = {
    books: [],
    categories: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };


  async componentDidMount() {
    const {data: categories} = await getCategories();
    const {data: books} = await getBooks();

    this.setState({ books , categories });
  }

  handleDelete = async book => {
    const notification = this.notificationSystem.current;
    const books = this.state.books.filter(m => m._id !== book._id);
    this.setState({ books });

    try{
      await deleteBook(book._id);
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

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      books: allBooks
    } = this.state;

    let filtered = allBooks;
    if (searchQuery)
      filtered = allBooks.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: books };
  };

  render() {
    const { length: count } = this.state.books;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no books</p>;

    const { totalCount, data: books } = this.getPagedData();

    return (
      <div className="row books">
        <div className="col">
          <p>Showing {totalCount} Books</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <BooksTable
            books={books}
            sortColumn={sortColumn}
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
}

export default Books;
