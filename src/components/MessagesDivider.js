import React, { PropTypes } from 'react';
import '../scss/messages-divider.scss';

const MessagesDivider = ({content, textColor, lineColor}) => {
  const style = {
    borderColor: lineColor
  };
  return (
    <div className={"messages-divider"} style={style}>
      <span style={{color:textColor}}>{content}</span>
    </div>
  );
};
MessagesDivider.propTypes = {

};
export default MessagesDivider;
