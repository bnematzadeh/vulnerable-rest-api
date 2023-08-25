import React, {Component} from 'react';
import _ from 'lodash';
import { getUser } from '../services/userService';
import { Link, NavLink } from 'react-router-dom';

class Profile extends Component {
    state = {
        userName: '',
        userInfo: []

     }


    async componentDidMount() {
        const userName = this.props.match.params.userName;
        const {data} = await getUser(userName);
        if (!data) return this.props.history.replace("/not-found");
        this.setState({userInfo: data, userName });
    }


    render() {
        const {userInfo} = this.state;
        return (
<React.Fragment>
    <div className="card">
        <div className="card-body">
            <div className="row">
                <div className="col">
                    <h1 className='fw-bold mb-4 text-center card-header'>User Profile</h1>
                        <ul className="nav flex-column profile">
                            <li className="nav-item">
                                Username: {userInfo.username}
                            </li>
                            <li className="nav-item">
                                Email: {userInfo.email}
                            </li>
                            <li className="nav-item" dangerouslySetInnerHTML={{__html: `Name: ${userInfo.name}`}}>

                            </li>
                            <li className="nav-item">
                                Credits: {userInfo.credit}
                            </li>
                                {userInfo.website && (
                                    <li className="nav-item">
                                        Website: {userInfo.website}
                                    </li>
                                )}

                            <li className="nav-item">
                                Referral Link: <Link to={`/signup?ref=${userInfo._id}`}>{`/signup?ref=${userInfo._id}`}</Link>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/profile/edit" className='btn btn-primary'>Edit</NavLink>
                            </li>
                            {userInfo.credit == 10 && (
                                <p>You have {userInfo.credit} credits! Send an email to vulrestapi@company.com for free book!</p>
                            )}
                        </ul>
                </div>
            </div>
        </div>
    </div>
</React.Fragment>
        );
    }
}

export default Profile;