import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({ label, type = "text", placeholder, value, onChange, name, icon: Icon, ...props }) {
  const isPassword = type === "password";
  const [show, setShow] = useState(false);

  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-wrap">
        {Icon && (
          <span className="field-icon">
            <Icon size={16} />
          </span>
        )}
        <input
          id={name}
          type={isPassword ? (show ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="custom-input"
          autoComplete={type === "email" ? "email" : "off"}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShow((s) => !s)}
            tabIndex={-1}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
