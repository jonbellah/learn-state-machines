import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';
import CameraIcon from './Camera';

const logo = css`
  height: 28px;
`;

const logoText = css`
  font-weight: 700;
  font-size: 1.5rem;
`;

const Logo = props => {
  const color = props.color || '#333';

  return (
    <span className="w-100 flex items-center" style={{ color }}>
      <CameraIcon cssClass={`${logo} mr2`} color={color} />
      <span className={logoText}>
        Photobook
      </span>
    </span>
  );
};

Logo.propTypes = {
  color: PropTypes.string,
};

export default Logo;
