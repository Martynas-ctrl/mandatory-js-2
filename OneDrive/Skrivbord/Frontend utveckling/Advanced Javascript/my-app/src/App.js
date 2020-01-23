 import React, {Component} from 'react';
 import { BrowserRouter as Router, Route  } from 'react-router-dom';

 import AddMessage from './components/AddMessage';
 import Header from './components/layout/Header';
 import io from 'socket.io-client';
 import Login from './components/Login.js';
 import './App.css';
 import Linkify from 'react-linkify';
 import {emojify} from 'react-emojione';

 
 
//In the first state we have AllMessages which will hold all messages from the server and username will hold the name that user types in when he wants to Login.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllMessages: [],
      username: '',
      login: false
    }
    this.socket = io('http://3.120.96.16:3000');

    this.getMsgArr = this.getMsgArr.bind(this);
    this.setUsername = this.setUsername.bind(this)
    this.onLogin = this.onLogin.bind(this)

  }

  
  //Updates the name of username to the value the user types in the Login input 
  setUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onLogin() {
    this.setState({
      login: true
    });
  }

  //All messages(data) from server will be saved in AllMessages array and then in second socket.on where message is sent which is an object in setState with key AllMessages it will be updated with method setState()
   componentDidMount() {
     this.socket.on('messages', data => {
       this.setState({AllMessages: data});
       console.log(this.state.AllMessages);
     });
     this.socket.on('new_message', data => {
       this.state.AllMessages.push(data)

       this.setState( {  AllMessages: this.state.AllMessages })
     })
   }

   getMsgArr(array) {
    console.log(array);
    this.setState({
    })
   }

  
   // Here I add Linkify and emojify which lets the user to use the links and emojis in the chat app also I add other js files I use here()
  render() {
    if(this.state.login === true) {
      return <AddMessage AllMessages={this.state.AllMessages} getMsgArr={this.getMsgArr} socket={this.socket} AllMessages={this.state.AllMessages} addMessage={this.addMessage} /> 
    }
     return (
       <Router>
            <div className="App">
              <div>
              <Route exact path='/' render={ () =>  <Login onLogin={this.onLogin} setUsername={this.setUsername} username={this.state.username} />} />
                 <React.Fragment>
                  <Header />
               </React.Fragment>
              <Route path='/AddMessages'  render={()=> <AddMessage AllMessages={this.state.AllMessages} />} />
            </div>
           </div>
       </Router>
     );
    }
  }
 
 export default App;

