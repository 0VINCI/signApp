import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css'

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  const classes = `btn btn-primary ${className}`;
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;