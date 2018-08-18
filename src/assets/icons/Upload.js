import PropTypes from 'prop-types';
import React from 'react';

const UploadIcon = props => {
  const cssClass = props.cssClass ? `${props.cssClass} icon` : 'icon';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="612px"
      height="612px"
      viewBox="0 0 612 612"
      className={cssClass}
    >
      <path
        fill="currentColor"
        d="M494.7 255c-17.85-86.7-94.35-153-188.7-153-73.95 0-137.7 40.8-168.3 102C58.65 214.2 0 277.95 0 357c0 84.15 68.85 153 153 153h331.5c71.4 0 127.5-56.1 127.5-127.5 0-66.3-53.55-122.4-117.3-127.5zM357 331.5v102H255v-102h-76.5L306 204l127.5 127.5H357z"
      />
    </svg>
  );
};

UploadIcon.propTypes = {
  cssClass: PropTypes.string,
};

export default UploadIcon;
