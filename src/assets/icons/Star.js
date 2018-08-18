import PropTypes from 'prop-types';
import React from 'react';

const StarIcon = props => {
  const color = props.color ? props.color : '#000';
  const cssClass = props.cssClass ? `${props.cssClass} icon` : 'icon';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cssClass}>
      <path
        fill={color}
        d="M153 230.775l94.35 68.85-35.7-112.2 94.35-66.3H191.25L153 6.375l-38.25 114.75H0l94.35 66.3-35.7 112.2z"
      />
    </svg>
  );
};

StarIcon.propTypes = {
  color: PropTypes.string,
  cssClass: PropTypes.string,
};

export default StarIcon;
