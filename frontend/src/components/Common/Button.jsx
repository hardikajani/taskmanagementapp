

import PropTypes from 'prop-types';

const Button = ({
  type = 'button',
  className,
  children,
  onClick,
  disabled,
 ...props
}) => {
  return (
    <button
      type={type}
      className={`flex w-full justify-center rounded-md ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;