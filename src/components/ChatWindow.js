import React, { Component, PropTypes } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ChatHead from './ChatHead';
import Scroll from 'react-custom-scrollbars';
import '../scss/chat-window.scss';


class ChatWindow extends Component {
  state={
    inputHeight:50
  }
  scrollToBottom=()=>{
    this.scroll.scrollToBottom();
  }
  getBottomPosition=()=>{
    return this.scroll.getScrollHeight()-this.scroll.getClientHeight();
  }
  isBottom=()=>{
    return this.getBottomPosition() == this.scroll.getScrollTop();
  }
  onChangeHeight=(height)=>{
    this.setState({ inputHeight: height });
  }
  componentDidUpdate(prevProps, prevState){
    if(!prevProps.messages.length && this.props.messages.length){
      this.scrollToBottom();
    }
    if(this.toBottom){
      this.scrollToBottom();
      this.toBottom=false;
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.messages.length - this.props.messages.length == 1){
      if(this.isBottom()){
        this.toBottom=true;
      }
    }
  }
  onScrollStop=()=>{
    console.log('asasdsadasd');
  }
  render(){
    const { messages, currentUser, hostUser, users} = this.props;
    const { inputHeight } = this.state;
    return (
      <div className="chat-window"   style={{paddingBottom:inputHeight+'px'}}>
        <ChatHead hostUser={hostUser}/>
        <Scroll onScrollStop={this.onScrollStop} ref={c=>this.scroll=c} className="chat-window__scroll" >
          <MessageList currentUserId={currentUser.id}  users={users} items={messages}/>
        </Scroll>
        <ChatInput onChangeHeight={this.onChangeHeight} onSubmit={this.props.onSubmit}/>
      </div>
    );
  }
}
ChatWindow.propTypes = {

};
export default ChatWindow;
