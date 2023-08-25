import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import { addSubscriber } from '../services/thirdParty';

class About extends Component{
    notificationSystem = React.createRef();
    state= {
        user: [],
        result: ''
    }


    async componentDidMount() {
        const query = this.props.location.search;
        const params = new URLSearchParams(query);
        if(params.get('email')){
            try{
                const {data} = await addSubscriber(params.get('email'));
                this.setState({result: data.email});
            }catch(ex){
                notification.addNotification({
                    message: 'Try again later',
                    level: 'error'
                });
            }
        }
    }

    handleChange = ({ currentTarget: input }) => {
        const user = { ...this.state.user };
        user[input.name] = input.value;
        this.setState({ user });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const notification = this.notificationSystem.current;
        try{
            const {email} = this.state.user;
            const {data} = await addSubscriber(email);
            this.setState({result: data.email});
        }catch(ex){
            notification.addNotification({
                message: 'Try again later',
                level: 'error'
            });
        }
    };

    render(){
        const {result} = this.state;
        return (
            <React.Fragment>
                <div className="text-center about">
                <h1>What is the Vulnerable REST API ?</h1>
                    <div className="mt-4">
                        <p className='lead'>In this project, you'll need to identify the API vulnerabilities based on OWASP API Security Top 10 - 2023</p>
                        </div>
                    </div>
                    <form className="form-inline about" onSubmit={this.handleSubmit}>
                        <label for="inlineFormEmail" className="m-2">Email</label>
                        <input type="text" className="form-control m-2" id="inlineFormEmail" onChange={this.handleChange} name='email'/>
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </form>
                    {result && (
                        <div className="mt-4 text-center">
                            <p className='lead' dangerouslySetInnerHTML={{__html: `Thank you ${this.state.result} for subscribing!`}}></p>
                        </div>
                    )}
                <NotificationSystem ref={this.notificationSystem} />
            </React.Fragment>
        );
    }

}

export default About;