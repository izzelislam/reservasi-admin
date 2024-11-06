import { Icon } from '@iconify/react/dist/iconify.js'
import { useModalStore } from '../store/use-modal-store'

const CheckOutButton = ({id}: {id: string}) => {

  const {setModalState} = useModalStore()

  const handleDelete =  () => {
    setModalState({
      isOpen: true,
      modalId: id,
      mode: 'checkout'
    })
  }

  return (
    <div onClick={handleDelete} className="flex items-center gap-2 cursor-pointer pt-4">
      <Icon icon="solar:inbox-out-bold-duotone" className='text-xl text-red-700' />
      <span>Check Out</span>
    </div>
  )
}

export default CheckOutButton