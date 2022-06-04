import React from 'react';
import svgSprites from './sprites.svg';

const Icon = ({ name, color, size, className }) => {
  return (
    <svg
      className={`icon icon-${name} ${className}`}
      fill={color}
      stroke={color}
      width={size}
      height={size}
    >
      <use xlinkHref={`${svgSprites}#icon-${name}`} />
    </svg>
  );
};

export default Icon;
