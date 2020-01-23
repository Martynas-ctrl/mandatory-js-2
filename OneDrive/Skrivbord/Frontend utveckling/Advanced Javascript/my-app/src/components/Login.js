import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            login: false
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onLogin()
        
    }

    render() {
        if(/^[a-zA-Z\d_-\s]{1,12}$/.test(this.state.username)) {
            return <Redirect to='/AddMessage' />;
        }
        return (
            <div><h1 className='Login'>Please Login</h1>
            <div className='Login'>
            <form onSubmit={this.onSubmit}>
                <input
                text='text'
                placeholder='your username...'
                onChange={this.props.setUsername}>
                
                </input>
            </form>
            
            <button onClick={this.onSubmit}>Login</button>
            </div>
            </div>
        )
    }
}

export default Login