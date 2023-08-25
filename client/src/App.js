import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import Books from "./components/books";
import BookForm from "./components/bookForm";
import EditBook from "./components/editBook";
import Authors from './components/authors';
import EditAuthor from './components/editAuthor';
import Users from './components/users';
import NewAuthor from "./components/newAuthor";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import LogoutForm from './components/logoutForm';
import ResetPasswordForm from "./components/resetPassword";
import ChangePasswordForm from "./components/changePasswordForm";
import signUpForm from "./components/signUpForm";
import Home from "./components/common/home";
import Footer from "./components/common/footer";
import About from "./components/about";
import AdminLogin from "./components/admin";
import AdminProtectedRoute from './components/common/adminProtectedRoute';
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";
import auth from "./services/authService";
import "./App.css";





class App extends Component {
  state = {}

  componentDidMount() {
    const user = auth.getUser();
    this.setState({user});
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={signUpForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/profile/edit" component={EditProfile} />
            <AdminProtectedRoute path="/profile/users" component={Users} />
            <ProtectedRoute path="/profile/:userName" component={Profile}/>
            <Route path="/logout" component={LogoutForm} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/reset-password" component={ResetPasswordForm} />
            <Route path="/change-password" component={ChangePasswordForm} />
            <AdminProtectedRoute path="/addBook" component={BookForm} />
            <Route path="/books" exact render={props => <Books {...props} user={this.state.user} />}/>
            <AdminProtectedRoute path="/books/:bookId" component={EditBook} />
            <AdminProtectedRoute path="/addAuthor" component={NewAuthor} />
            <AdminProtectedRoute path="/authors/:authorId" component={EditAuthor} />
            <Route path="/authors" component={Authors} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
