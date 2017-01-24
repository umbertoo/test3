import React, { Component, PropTypes } from 'react';
import {EmojiConvertor} from './EmojiPicker/emoji.min';
import Remarkable  from 'remarkable';
import sheet from './EmojiPicker/images/sheet_apple_32.png';
import shallowEqual from 'shallowequal';
import moment from 'moment';
import Avatar from './Avatar';
import '../scss/message-block.scss';

class Message extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return !shallowEqual(this.props, nextProps);
  }
  componentWillMount(){
    this.md = new Remarkable('full', {
      html: true,
      linkify: true
    });
    this.emoji = new EmojiConvertor();
    this.emoji.use_sheet = true;
    this.emoji.img_sets.apple.sheet = sheet;
  }
  rawMarkup=()=>{
    const markup = this.emoji.replace_colons(this.props.text);
    return { __html: this.md.render(markup) };
  }
  render(){
    const {text, createdAt, isOwn, user, minimaized} = this.props;
    const date = moment(createdAt).fromNow();
    const isOwnClass = isOwn? '-is-own' :'';
    return (
      <div className={"message-block "+ isOwnClass}>
        {(!isOwn && !minimaized) &&
          <div className="message-block__avatar">
            <Avatar image={user.avatar}/>
          </div>
        }
        {(!isOwn && !minimaized) &&
          <div className="message-block__head">
            <div className="message-block__username">
              {user.name}
            </div>
            <div className="message-block__date">{date}</div>
          </div>
        }
        <div className="message-block__text" dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
}
Message.propTypes = {

};
export default Message;
