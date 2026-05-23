import React from 'react'

export default function Select({
    label,id,name,value,onChange,hiddenOption,options,error
}) {
  return (
      <div className="input-container">
        {label && <label htmlFor={id}>{label}</label>}
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        >
          <option hidden>{hiddenOption}</option>
          {
            options.map((option,i) => (<option  key={i} value={option}>{option}</option>))
          }
        </select>
       {error && <p className="error">{error}</p>}
      </div>
  )
}
