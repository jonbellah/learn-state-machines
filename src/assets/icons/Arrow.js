import React from 'react';

export default props => (
  <svg className="arrow" height="8" width="14" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 8a.976.976 0 0 1-.693-.288L.287 1.678a.984.984 0 0 1 0-1.39.979.979 0 0 1 1.387 0L7 5.628l5.326-5.34a.979.979 0 0 1 1.387 0 .984.984 0 0 1 0 1.39l-6.02 6.034A.976.976 0 0 1 7 8z"
      fill={props.color || '#000'}
      fillRule="nonzero"
    />
  </svg>
);
