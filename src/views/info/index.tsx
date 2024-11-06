import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react/dist/iconify.js"
import { toast } from "react-toastify"
import { useInfoStore } from "../../store/use-info-store"
import { useModalStore } from "../../store/use-modal-store"
import Layout from "../../components/layout"
import Wrapper from "../../components/wrapper"
import DataTable from "../../components/data-table"
import Modal from "../../components/modal"
import Button from "../../components/button"
import { infoColumns } from "./_parts/columns"

const InfoPage = () => {

  const {infos, getInfos, loading, attributes, deleteInfo} = useInfoStore()
  const {isOpen, modalId, setModalState} = useModalStore()


  const init = async () => {
    await getInfos()
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
      await deleteInfo(id), init()
      setModalState({
        isOpen: false,
        modalId: null
      })
      toast.success('Berhasil menghapus info')
    } catch (error) {
      toast.error('Gagal menghapus info')
    }
  }

  return (
    <Layout>
      <Wrapper title="Postingan" subtitle="data postingan/artikel">
        <div>
          <DataTable
            data={infos} 
            columns={infoColumns}
            attributes={attributes}
            loading={loading}
            fn={getInfos}
          >
            <div>
              <Link to={"/post/info/create"} className="btn bg-gray-700 text-white"><Icon icon="solar:add-square-bold-duotone" className='text-xl' /> Buat Info</Link>
            </div>
          </DataTable>
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

export default InfoPage