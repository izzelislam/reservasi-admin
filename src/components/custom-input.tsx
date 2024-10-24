import React from 'react'

type Props = {
  label?: string
  type?: string
  placeholder?: string
  value?: any
  onChange?: () => void,
  error?: string
}

const CustomInput:React.FC<Props> = ({type, placeholder, value, onChange, label, error}: Props) => {
  return (
    <div className='mb-5'>
      {
        label &&
        <div className="label-text mb-1">{label}</div>
      }
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} 
      className={`input input-bordered w-full focus:outline-none focus:border-gray-500 ${error && 'border-red-500'}`} />

      {error &&
      <div className='text-red-500 text-sm mt-1 ml-1'>name is required</div>
      }

    </div>
  )
}

export default CustomInput