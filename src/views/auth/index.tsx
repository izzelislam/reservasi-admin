import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import AuthLayout from '../../components/auth-layout'
import CustomInput from '../../components/custom-input'
import { Link } from 'react-router-dom'

const LoginPage: React.FC = () => {
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
          <Link to="/dashboard" className='btn bg-gray-700 text-white w-full mt-4'>
            <Icon icon="solar:login-3-bold-duotone" className='text-xl mr-1' />
            Login
          </Link>
        </div>
        <div className='text-center'>
          <p className='text-gray-500 text-sm mt-3'>Belum punya akun? <a href="#" className='text-sky-700'>Daftar Sekarang</a></p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginPage