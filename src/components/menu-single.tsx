import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  label: string
  icon: string
  path: string
  isActive?: boolean
}

const MenuSingle:React.FC<Props>  = ({label, icon, path, isActive}:Props) => {
  

  return (
    <Link to={path}  className={`menu-sibgle ${isActive ? 'bg-gray-100' : ''}`}>
      <Icon icon={icon} className='menu-icon'  />
      <p>{label}</p>
    </Link> 
  )
}

export default MenuSingle