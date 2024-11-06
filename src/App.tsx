import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/index.css'
import AppRoutes from './router'

function App() {


  return (
    <div>
      <AppRoutes/>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        stacked
      />
      
    </div>
  )
}

export default App
