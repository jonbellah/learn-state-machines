import PropTypes from 'prop-types';
import React from 'react';
import { styledInput, styles } from './styles';

const Input = props => {
  const {
    autoComplete,
    children,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    type,
    value,
  } = props;

  switch (type) {
    case 'textarea':
      return (
        <textarea
          id={name}
          className={styles}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {children}
        </textarea>
      );
    default:
      return (
        <input
          type={type || 'text'}
          id={name}
          name={name}
          className={`${styles} ${styledInput}`}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      );
  }
};

Input.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
