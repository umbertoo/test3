import React, { Component, PropTypes } from 'react';
import '../scss/chat-button.scss';
class ChatButton extends Component {
  render(){
    return (<div onClick={this.props.onClick} className="chat-button">

      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.583 14.894l-3.256 3.78c-.7.813-1.26.598-1.25-.46a10689.413 10689.413 0 0 1 .035-4.775V4.816a3.89 3.89 0 0 1 3.88-3.89h12.064a3.885 3.885 0 0 1 3.882 3.89v6.185a3.89 3.89 0 0 1-3.882 3.89H4.583z"
          fill="#FFF" fillRule="evenodd"/>
      </svg>
    </div>);
  }
}
ChatButton.propTypes = {

};
export default ChatButton;
