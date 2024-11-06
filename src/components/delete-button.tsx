import { Icon } from '@iconify/react/dist/iconify.js'
import { useModalStore } from '../store/use-modal-store'

const DeleteButton = ({id}: {id: string}) => {

  const {setModalState} = useModalStore()

  const handleDelete =  () => {
    setModalState({
      isOpen: true,
      modalId: id
    })
  }

  return (
    <div onClick={handleDelete} className="flex items-center gap-2 cursor-pointer pt-4">
      <Icon icon="solar:trash-bin-minimalistic-bold-duotone" className='text-xl text-red-500' />
      <span>Deltete</span>
    </div>
  )
}

export default DeleteButton