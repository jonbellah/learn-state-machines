import PropTypes from 'prop-types';
import React from 'react';
import Gravatar from 'react-gravatar';
import * as styles from './styles';

const Byline = props => (
  <div className={props.className}>
    <Gravatar email={props.email} size={64} default="mp" className={`${styles.avatar} br-100 mr2`} />
    <span className="f6 mid-gray fw5">{props.username}</span>
  </div>
);

Byline.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  username: PropTypes.string,
};

export default Byline;
