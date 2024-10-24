import React from 'react'
import AuthLayout from '../components/auth-layout'
import CustomInput from '../components/custom-input'
import { Icon } from '@iconify/react/dist/iconify.js'

const LoginOnePage: React.FC = () => {
  return (
    <AuthLayout>
      <div className='bg-white shadow-md p-4 max-w-[450px] rounded-lg'>
        <div className='mb-4'>
          <h1 className='text-xl font-semibold text-gray-600 flex items-center mb-2'> 
            <Icon icon="solar:login-3-bold-duotone" className='text-xl mr-1' />
            Halaman Login 
          </h1>
          <p className='text-gray-500 text-sm'>Silahkan login mengunakan email dan password anda</p>
        </div>
        <div>
          <CustomInput type="text" placeholder="Username" label='Username'/>
          <CustomInput type="pasword" placeholder="*********" label='password'/>
        </div>
        <div className='mb-8'>
          <button className='btn bg-gray-700 text-white w-full mt-4'>
            <Icon icon="solar:login-3-bold-duotone" className='text-xl mr-1' />
            Login
          </button>
        </div>
        <div className='text-center'>
          <p className='text-gray-500 text-sm mt-3'>Belum punya akun? <a href="#" className='text-sky-700'>Daftar Sekarang</a></p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginOnePage