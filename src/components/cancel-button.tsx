import { Icon } from '@iconify/react/dist/iconify.js'
import { useModalStore } from '../store/use-modal-store'

const CancelButton = ({id}: {id: string}) => {

  const {setModalState} = useModalStore()

  const handleDelete =  () => {
    setModalState({
      isOpen: true,
      modalId: id,
      mode: 'cancel'
    })
  }

  return (
    <div onClick={handleDelete} className="flex items-center gap-2 cursor-pointer pt-4">
      <Icon icon="solar:close-square-bold-duotone" className='text-xl text-orange-600' />
      <span>batalkan</span>
    </div>
  )
}

export default CancelButton