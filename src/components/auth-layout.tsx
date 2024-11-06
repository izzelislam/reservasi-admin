import React, { useEffect } from 'react'
import { useAuthStore } from '../store/use-auth-store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {
  children: React.ReactNode
}

const AuthLayout:React.FC<Props> = ({children}: Props) => {

  const [thme] = React.useState<any>(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

  const {getProfile} = useAuthStore()
  const router = useNavigate()

  useEffect(() =>{
    localStorage.setItem('theme', thme)
    const itemStorage:any = localStorage.getItem('theme')
    const element = document.querySelector('html')
    if (element) {
      element?.setAttribute('data-theme', itemStorage)
      element?.setAttribute('class', itemStorage)
    }
    // set 
  },[thme])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try {
      const res = await getProfile()
      if (res) {
        router('/dashboard')
      }
      toast.success("Anda sudah login")
    } catch (error:Response|any) {
      if (error.status === 401) {
        router('/')
      }
      toast.error(error.data.message)
    }
  }

  return (
    <div className='w-full h-screen flex'>
      <div className='hidden md:w-1/2 bg-sky-400 h-screen md:flex flex-col items-center justify-center p-8 bg-cover bg-center'
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D)' }}
      >
        <div className='max-w-xl bg-white/70 p-8 rounded-lg'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800'>Welcome back, you have been missed</h2>
          <p className='text-gray-700'>“Idealistic as it may sound, altruism should be the driving force in business, not just competition and a desire for wealth.”</p>
        </div>
      </div>
      <div className='w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-gray-50 p-6'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout