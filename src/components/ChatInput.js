import React, { Component, PropTypes } from 'react';
import MessageTextArea from './MessageTextArea';
import '../scss/chat-input.scss';

const noop = ()=>{};
class ChatInput extends Component {
  render(){
    return (
      <div className="chat-input">
        <MessageTextArea
          placeHolder={'Задайте свой вопрос'}
          onTyping={noop}
          onEnterKey={this.props.onSubmit}
          onChangeHeight={this.props.onChangeHeight}
      />
      </div>
      );
    }
  }
  ChatInput.propTypes = {

  };
  export default ChatInput;
