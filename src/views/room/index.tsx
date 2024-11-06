import { useEffect } from 'react'
import DataTable from '../../components/data-table'
import Layout from '../../components/layout'
import Wrapper from '../../components/wrapper'
import { useRoomStore } from '../../store/use-room-store'
import { RoomColumns } from './_parts/column'
import { useModalStore } from '../../store/use-modal-store'
import Modal from '../../components/modal'
import Button from '../../components/button'
import { toast } from 'react-toastify'

const RoomPage = () => {

  const {loading, getRooms, rooms, attributes, deleteRoom} = useRoomStore()
  const {modalId, isOpen , setModalState} = useModalStore()

  const init = async () => {
    await getRooms()
  }
  
  useEffect(() => {
    init()
  }, [])

  const handleClose = () => {
    setModalState({
      isOpen: false,
      modalId: null
    })
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteRoom(id), init()
      setModalState({
        isOpen: false,
        modalId: null
      })
      toast.success('Berhasil menghapus fasilitas')
    } catch (error) {
      toast.error('Gagal menghapus fasilitas')
    }
  }

  return (
    <Layout>
      <Wrapper title="Room" subtitle="ringkasan performa">
        <div>
          <DataTable 
            data={rooms} 
            columns={RoomColumns}
            attributes={attributes}
            loading={loading}
            fn={getRooms}
          />
        </div>
      </Wrapper>

      <Modal visible={isOpen} onClose={handleClose}>
        <div>
          <h2 className='text-xl font-bold text-center'>Konfirmasi hapus data</h2>
          <p className='text-center text-gray-500 my-2'>Apakah anda yakin ingin menghapus data ini ?</p>

          <div className="flex justify-center gap-2">
            <div>
              <Button type="button" bg="bg-sky-600" onClick={handleClose} title='Batal' icon='solar:close-square-bold-duotone' />
            </div>
            <div>
              <Button bg='bg-red-600' loading={loading} disabled={loading} type="submit" onClick={() => handleDelete(modalId)} title='Hapus' icon='solar:trash-bin-minimalistic-bold-duotone' />
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  )
}

export default RoomPage