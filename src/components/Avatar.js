import React, { PropTypes } from 'react';
import '../scss/avatar.scss';
const Avatar = ({
  image
}) => {
  return (
    <div className="avatar"
      style={{backgroundImage:'url("/imgs/avatars/'+image+'")'}} />
    );
  };
  Avatar.propTypes = {

  };
  export default Avatar;
