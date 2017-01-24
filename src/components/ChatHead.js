import React, { Component, PropTypes } from 'react';
import '../scss/chat-head.scss';
import Avatar from './Avatar';

class ChatHead extends Component {
    render(){
      const {hostUser}= this.props;
        return (
          <div className="chat-head">
            <div className="chat-head__avatar">
              <Avatar image={hostUser.avatar}/>
            </div>
            <div className="chat-head__username">
              {hostUser.name}
            </div>
            <div className="chat-head_status">
              <div className="chat-head_indicator"/>
              online
            </div>
          </div>
        );
    }
}
ChatHead.propTypes = {

};
export default ChatHead;
