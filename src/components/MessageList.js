import React, { PropTypes } from 'react';
import Message from './Message';
import MessagesDivider from './MessagesDivider';
import {DIVIDER_TIME} from '../selectors/selectors';
const MessageList = ({
  items, currentUserId, users
}) => {
  return (
    <div>
      {items.reduce((list, item)=>{
        if (!item.type)
        list.push(
          <Message text={item.text}
            user={users[item.userId]}
            key={item.createdAt}
            isOwn={currentUserId==item.userId}
            createdAt={item.createdAt}
            minimaized={item.minimaized}
          />
        );
        if(item.type==DIVIDER_TIME){
          list.push( <MessagesDivider key={Math.random()} content={item.content}/>);
        }
        return list;
      },[])}
    </div>
  );
};
MessageList.propTypes = {

};

//
// if (!item.type){
//   if  (newMessagesAfterId && item.id > newMessagesAfterId && i==0){
//     list.push( <MessagesDivider key={"new_messages"} refz={c=>this.NEW_MESSAGES=c}
//       content={'Новые сообщения'} textColor={RED_COLOR} lineColor={RED_COLOR}/>
//     );
//   }
//   list.push( <Message
//     isEdited={item.createdAt!==item.updatedAt}
//     isEditable={this.props.editableMessageId==item.id}
//     canBeEditable={this.props.currentUserId==item.userId}
//     minimaized={item.minimaized}
//     onEdit={this.props.onMessageEdit}
//     onSaveEdit={this.props.onSaveMessageEdit}
//     onCancelEdit={this.props.onCancelMessageEdit}
//     onDelete={this.props.onMessageDelete}
//     id={item.id}
//     userId={item.userId}
//     user={this.props.users[item.userId]}
//     text={item.text}
//     key={item.id}
//     createdAt={item.createdAt}/>
//   );
//
// }
// if(item.type==DIVIDER_TIME)
// list.push( <MessagesDivider key={item.key} content={item.content}/>        );
//
// if(!item.type && item.id == newMessagesAfterId && i != messages.length-1  )
// list.push( <MessagesDivider key={"new_messages"} refz={c=>this.NEW_MESSAGES=c}
//   content={'Новые сообщения'} textColor={RED_COLOR} lineColor={RED_COLOR}/>
// );

export default MessageList;
