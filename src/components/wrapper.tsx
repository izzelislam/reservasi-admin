import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: React.ReactNode,
  title?: string,
  subtitle?: string
  back?: string
}

const Wrapper:React.FC<Props> = ({children, title, subtitle, back}: Props) => {
  return (
    <>
      {
        title && subtitle && (
          <div className="mb-6 mt-[80px] flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
              <p className="text-gray-500 text-sm">{subtitle}</p>
            </div>
            {back && (
              <Link to={back} className='flex items-center gap-1 btn bg-gray-700 dark:bg-gray-600 text-white'>
                <Icon icon="solar:arrow-left-bold-duotone" className='text-xl text-white' />
                <span className="text-white text-sm">Kembali</span>
              </Link>
            )}
          </div>
        )
      }
      <div className={`${!title && 'mt-3'} bg-white dark:bg-gray-950 rounded-2xl md:p-8 p-4 overflow-hidden`}>
        {children}
      </div>
    </>
  )
}

export default Wrapper