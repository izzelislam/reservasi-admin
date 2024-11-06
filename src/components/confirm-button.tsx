import { Icon } from '@iconify/react/dist/iconify.js'
import { useModalStore } from '../store/use-modal-store'

const ConfirmButton = ({id}: {id: string}) => {

  const {setModalState} = useModalStore()

  const handleDelete =  () => {
    setModalState({
      isOpen: true,
      modalId: id
    })
  }

  return (
    <div onClick={handleDelete} className="flex items-center gap-2 cursor-pointer pt-4">
      <Icon icon="solar:leaf-bold-duotone" className='text-xl text-sky-700' />
      <span>Konfirmasi</span>
    </div>
  )
}

export default ConfirmButton