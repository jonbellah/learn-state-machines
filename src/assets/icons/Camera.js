import PropTypes from 'prop-types';
import React from 'react';

const CameraIcon = props => {
  const color = props.color ? props.color : '#000';
  const cssClass = props.cssClass ? props.cssClass : '';

  return (
    <svg
      className={cssClass}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color} fillRule="evenodd">
        <path d="M8 .001a8 8 0 0 0-8 8 8 8 0 1 0 16 0 8 8 0 0 0-8-8zm4.555 11.905a5.998 5.998 0 0 1-8.459.65 5.997 5.997 0 0 1-.65-8.459 6 6 0 0 1 9.109 7.809z" />
        <path d="M8 4.001A4 4 0 0 0 4 8v.002a.5.5 0 0 0 1 0V8a3 3 0 0 1 3-2.999.5.5 0 0 0 0-1z" />
      </g>
    </svg>
  );
};

CameraIcon.propTypes = {
  color: PropTypes.string,
  cssClass: PropTypes.string,
};

export default CameraIcon;
