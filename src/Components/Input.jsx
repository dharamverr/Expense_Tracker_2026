import React from 'react'

export default function Input({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  ...rest
}) {
  return (
    <div className="input-container">
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
}