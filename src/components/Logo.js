import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/logo.svg"
      style={{width:40,height:40}}
      {...props}
    />
  );
};

export default Logo;
