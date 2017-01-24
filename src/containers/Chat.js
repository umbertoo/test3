import React, { Component, PropTypes } from 'react';
import ChatButton from '../components/ChatButton';
import ChatWindow from '../components/ChatWindow';

import random from 'lodash/random';

import {getMessagesWidthDeviders} from '../selectors/selectors';

function checkStatus (res){
  if (res.ok) {
    return res.json();
  } else {
    console.error(res.error);
  }
}



class Chat extends Component {
  state={
    messages:[],
    showWindow:false,
    showButton:false,
    currentUserId:1,
    hostUserId:2,
    users:{
      1:{
        id:1,
        name:'currentUser',
        avatar:''
      },
      2:{
        id:2,
        name:'Chat bot',
        avatar:'bot1'
      }
    }
  }
  componentDidMount(){
    this.setState({ messages: JSON.parse(localStorage.getItem('messages')) || []});

  }
  componentDidUpdate(prevProps, prevState){
    localStorage.setItem('messages', JSON.stringify(this.state.messages));
  }
  onSubmitMessage=(text)=>{
    const now = Date.now();
    const newOwnMessage = {text, createdAt: now, id:now, userId:this.state.currentUserId};
    this.setState({ messages: [...this.state.messages, newOwnMessage] },()=>{

      this.chatWindow.scrollToBottom();
    });

    fetch('/api/get-answer', {method:'POST',
    headers:{
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }, body:"q="+text})
    .then(checkStatus)
    .then(res=>{
      console.log('res',res);
      setTimeout(()=>{
        const now = Date.now();
        this.setState({ messages:[...this.state.messages, {text:res.a, createdAt:now, id:now, userId:2}] });
      },random(1000,5000));
    });

  }
  onChatButtonClick=()=>{
    console.log('onChatButtonClick');
  }
  render(){
    const { messages, currentUserId, hostUserId, currentUser , users} = this.state;
    return (
      <div>
        <ChatButton onClick={this.onChatButtonClick}/>

        <ChatWindow
          ref={c=>this.chatWindow=c}
          users={users}
          hostUser={users[hostUserId]}
          currentUser={users[currentUserId]}
          messages={getMessagesWidthDeviders(messages)}
          onSubmit={this.onSubmitMessage}/>
      </div>
      );
    }
  }
  Chat.propTypes = {

  };
  export default Chat;
