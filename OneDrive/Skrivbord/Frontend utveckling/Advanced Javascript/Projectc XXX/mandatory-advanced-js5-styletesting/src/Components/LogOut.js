import React, { Component } from 'react'

import { updateToken } from './TokenStore';
import { Redirect } from 'react-router-dom';

class LogOut extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            logout: false
        }
    }

    logOut = () => {
        this.setState({ logout: true });
        updateToken(null);
    }

    render() {
        const { logout } = this.state;

        if (logout) return <Redirect to="/" />

        return (
            <>
                <button onClick={this.logOut}>Log out</button>
            </>
        )
    }
}

export default LogOut
