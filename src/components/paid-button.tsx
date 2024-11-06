import { Icon } from '@iconify/react/dist/iconify.js'
import { useModalStore } from '../store/use-modal-store'

const PaidButton = ({id}: {id: string}) => {

  const {setModalState} = useModalStore()

  const handleDelete =  () => {
    setModalState({
      isOpen: true,
      modalId: id,
      mode: 'paid'
    })
  }

  return (
    <div onClick={handleDelete} className="flex items-center gap-2 cursor-pointer pt-4">
      <Icon icon="solar:card-2-bold-duotone" className='text-xl text-violet-600' />
      <span>Bayar komisi</span>
    </div>
  )
}

export default PaidButton