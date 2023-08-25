import React from 'react';
import { SocialIcon } from 'react-social-icons';

const Footer = () =>{
 return(
        <footer className="bg-dark text-center text-lg-start fixed-bottom">
            <div className="text-center p-2 text-light" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                <SocialIcon bgColor="#4d5252" fgColor="#ebf2f2" style={{ height: 35, width: 35 }} url="https://twitter.com/LogicalHunter" target="_blank"/>
                <SocialIcon bgColor="#4d5252" fgColor="#ebf2f2" className="ml-1" style={{ height: 35, width: 35 }} url="https://www.linkedin.com/in/borna-nematzadeh/" target="_blank"/>
                <SocialIcon bgColor="#4d5252" fgColor="#ebf2f2" className="ml-1" style={{ height: 35, width: 35 }} url="https://github.com/bnematzadeh" target="_blank"/>
            </div>
        </footer>
    );
}

export default Footer;