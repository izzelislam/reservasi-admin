import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

interface Prop {
  title : string
  type ?: "submit" | "reset" | "button"
  disabled ?: boolean
  loading ?: boolean
  icon ?: string
  onClick ?: () => void
  bg?: string
}

const Button: React.FC<Prop> = ({title, type="submit", disabled, loading, icon, onClick, bg= 'bg-gray-700'}: Prop) => {
  return (
    <button 
      className={`btn text-white w-full mt-4 ${bg}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {
        loading &&
        <Icon icon="svg-spinners:270-ring-with-bg" className='text-xl mr-1' />
      }
      {
        icon &&
        <Icon icon={icon} className='text-xl mr-1' />
      }
      {title}
    </button>
  )
}

export default Button