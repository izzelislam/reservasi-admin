import { Bounce, toast, ToastOptions } from "react-toastify"


interface Params {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
}

const toaster = ({ message, type }: Params) => {
  
  const config: ToastOptions<unknown> = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    }

  switch (type) {
    case 'success':
      return toast.success(message, config)
    case 'error':
      return toast.error(message, config)
    case 'warning':
      return toast.warn(message)
    case 'info':
      return toast.info(message)
    default:
      return toast(message)
  }
}

export default toaster