import React, { Component } from 'react';
import Linkify from 'react-linkify';
 import {emojify} from 'react-emojione';


export class AddMessage extends Component {
    constructor(props) {
     super(props);
    this.state = {
         newToMessage: [],
         username: 'Hej',
         content: '',
      }
    }

    componentDidMount() {
        this.newMsg = [];
    }

    onSubmit(e) {
        
        e.preventdefault();
        this.setState({
            username: this.props.username,
            login: true
            
        })
        
    }
   
    //When user submits the input the value of input will be send to server and will be shown on Chat screen , also the value of input wil be empty when user press enter key or button send
    onSubmit = (e) => {
        e.preventDefault();
       
        if(this.state.content.length <= 200) {

        
        this.setState({ username: this.state.username, content: this.state.content, content: '' });
        console.log(this.state.username, this.state.content);
        
        //sends this.state.content which is text you type in to server
        this.props.socket.emit('message', {
            username: this.state.username,
            content: this.state.content
        }, (response) =>{
            console.log(response);
            this.setState({
                newMsg: [...this.newMsg, response.data.newMessage]
            });
        //makes your text you type in visible on the screen
            let newArray = this.props.AllMessages;
            // console.log(newArray);
            newArray.push(response.data.newMessage);
            this.setState({
                newToMessage: newArray   
            });
            this.props.getMsgArr(this.state.newToMessage);
        })
        console.log(this.state.newToMessage);
    }else{
       alert('To many letters! Max 200!')
    }
}



    onChange = (e) => this.setState({ content: e.target.value });

//create input for message typing and button to send the message
    render() {
        return (<>
            <div className='textContainer'>
                {this.props.AllMessages.map(message =>
                <p style={liStyle} key={message.id}>
                  <span>{message.username}:<Linkify>{emojify(message.content)}</Linkify> </span>
                </p>)}
            </div>
            <form onSubmit={this.onSubmit} className='formContainer'>
                <input
                     type='text'
                     name='title'
                     placeholder='Type a message ...'
                     value={this.state.content}
                     onChange={this.onChange}
                     className='input'
                 />
                 <button
                    type='submit' 
                    className='btn' 
                 >Send</button>
            </form>    
            </>  
        )
    }
}

const liStyle = {
    backgroundColor: '#f4f4f4'
   
  }

export default AddMessage
