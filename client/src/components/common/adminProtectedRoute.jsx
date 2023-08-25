import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const AdminProtectedRoute = ({path, component:Component, render, ...rest }) => {
    return (
        <Route
        {...rest}
        render={props => {
            if(!auth.getUser() || auth.getUser().role !== 'ADMIN') return <Redirect to={{
                pathname: '/not-found',
                state: { from: props.location }
            }} />;
            return Component ? <Component {...props}/> : render(props);
        }} />
    );
}

export default AdminProtectedRoute;