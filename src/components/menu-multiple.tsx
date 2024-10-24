import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  label: string
  icon: string
  children: any[]
  handleToogle: () => void
  isOpenDropdown: boolean
  isActive?: boolean
}

const MenuMultiple:React.FC<Props> = ({label, icon, children, handleToogle, isOpenDropdown, isActive}: Props) => {


  return (
    <>
      <div onClick={handleToogle} className={`menu-multi ${isActive ? 'bg-gray-100' : ''}`}>
        <div className='title'>
          <Icon icon={icon} className='menu-icon'  />
          <p>{label}</p>
        </div>
        
        <Icon icon="lucide:chevron-down" className={`arrow ${isOpenDropdown ? 'rotate-180' : ''}`}  />
      </div>
      <div className={`menu-multi-child ${isOpenDropdown ? 'max-h-auto opacity-100' : 'h-0 opacity-0 ' }`}>
          <ul>
            {children.map((child: any, index: number) => (
              <Link to={child.path}>
                <li key={index}>
                  <Icon icon="lucide:dot" className='text-xl' />
                  <p>{child.label}</p>
                </li>
              </Link>
            ))}
          </ul>
      </div>
    </>
  )
}

export default MenuMultiple