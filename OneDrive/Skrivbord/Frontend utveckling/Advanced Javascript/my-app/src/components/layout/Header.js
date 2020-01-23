import React from 'react';
import { Link } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';

 function Header() {
    return (
        <header style={headerStyle}>
            <h1>Front-End Chat</h1>
            <Link to='/'>Close</Link> |  <Link 
            to='/Login'>Login</Link>
        </header>
        //  <header style={headerStyle}>
        //  <h1>Front-End Chat</h1>
        //  <Link to='/'>Exit</Link> |  <Link 
        //  to='/Login'>Login</Link>
        // </header>
    )
}

const headerStyle = {
    background: 'red',
    color: 'White',
    textAlign: 'center',
    padding: '10px'
}
export default Header;