import React from 'react'

type Props = {
  label?: string
  type?: string
  placeholder?: string
  value?: any
  error?: string
  register?: any
  name?: string
  onchange?: any
  onFocus?: any
  disabled?: boolean
}



const CustomInput:React.FC<Props> = ({type, placeholder, value, label, error, register, name, onchange, onFocus, disabled}: Props) => {
  return (
    <div className='mb-5'>
      {
        label &&
        <div className="label-text mb-1">{label}</div>
      }
      <input 
        type={type} 
        placeholder={placeholder} 
        onChange={onchange}
        onClick={onFocus}
        value={value}
        disabled={disabled}
        {...(register ? register(name) : {})}
        className={`${type == 'file' ? 'file-input file-input-bordered' : 'input input-bordered'}  w-full focus:outline-none focus:border-gray-500 ${error && 'border-red-500'}`} 
      />

      {error &&
      <div className='text-red-500 text-sm mt-1 ml-1'>{error}</div>
      }

    </div>
  )
}

export default CustomInput