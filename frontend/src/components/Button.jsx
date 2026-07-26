function Button({ children, onClick, type = "button", variant = "primary", disabled = false, icon: Icon, className = "", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`.trim()}
      {...props}
    >
      {children}
      {Icon && <Icon size={15} />}
    </button>
  );
}

export default Button;
