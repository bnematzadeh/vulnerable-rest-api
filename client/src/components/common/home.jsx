import React from 'react';
import logo from '../../public/rest.png';
import logo2 from '../../public/owasp.jpg';

const Home = () => {
    return (
        <React.Fragment>
            <main role="main" className="container starter-template">
            <img src={logo} alt="" /><hr/>
            <img src={logo2} alt="" />
            </main>
        </React.Fragment>
  );
}

export default Home;