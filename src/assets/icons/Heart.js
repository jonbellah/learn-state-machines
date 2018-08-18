import PropTypes from 'prop-types';
import React from 'react';

const HeartIcon = props => {
  const color = props.color ? props.color : '#000';
  const cssClass = props.cssClass ? `${props.cssClass} icon` : 'icon';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="510px"
      height="510px"
      viewBox="0 0 510 510"
      className={cssClass}
    >
      <path
        fill={color}
        d="M255 489.6l-35.7-35.7C86.7 336.6 0 257.55 0 160.65 0 81.6 61.2 20.4 140.25 20.4c43.35 0 86.7 20.4 114.75 53.55C283.05 40.8 326.4 20.4 369.75 20.4 448.8 20.4 510 81.6 510 160.65c0 96.9-86.7 175.95-219.3 293.25L255 489.6z"
      />
    </svg>
  );
};

HeartIcon.propTypes = {
  color: PropTypes.string,
  cssClass: PropTypes.string,
};

export default HeartIcon;
