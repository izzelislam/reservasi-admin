import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import AuthLayout from '../../components/auth-layout'
import CustomInput from '../../components/custom-input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../store/use-auth-store'
import Button from '../../components/button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const formScheme = z.object({
  email: z.string().min(1, "Email atau no telepon harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
})

const LoginPage: React.FC = () => {

  const { login, loading } = useAuthStore()
  const router = useNavigate()

  const {register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      email: "admin@mail.com",
      password: "secret123"
    }
  })

  const hanleLogin = async (data: z.infer<typeof formScheme>) => {
    try {
      const res = await login(data)
      
      
      router('/dashboard')
      if (res){
        toast.success(res.message)
      }
      
      console.log(res)
    } catch (error:any) { 
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
 
    }
  }


  return (
    <AuthLayout>
      <div className='bg-white shadow-md p-4 max-w-[450px] rounded-lg'>
        <div className='mb-4'>
          <h1 className='text-xl font-semibold text-gray-600 flex items-center mb-2'> 
            <Icon icon="solar:login-3-bold-duotone" className='text-xl mr-1' />
            Halaman Login 
          </h1>
          <p className='text-gray-500 text-sm'>Silahkan login mengunakan email/ no telepon dan password anda</p>
        </div>
        <form onSubmit={handleSubmit(hanleLogin)}>
          <div>
            <CustomInput 
              type="text" 
              placeholder="Email atau no telepon" 
              label='Email atau no telepon'
              register={register}
              error={errors.email?.message}
              name='email'
            />

            <CustomInput 
              type="password" 
              placeholder="*********" 
              label='password'
              register={register}
              error={errors.password?.message}
              name='password'
            />
          </div>
          <div className='mb-8'>
            
            <Button 
              title="Login" 
              icon='solar:login-3-bold-duotone'
              loading={loading}
              disabled={loading}
            />

          </div>
        </form>
        <div className='text-center'>
          <p className='text-gray-500 text-sm mt-3'>Belum punya akun? <a href="#" className='text-sky-700'>Daftar Sekarang</a></p>
        </div>
      </div>
      
    </AuthLayout>
  )
}

export default LoginPage