import { useEffect } from "react"
import DataTable from "../../../components/data-table"
import Layout from "../../../components/layout"
import Wrapper from "../../../components/wrapper"
import { useAfiliatorStore } from "../../../store/use-afiliator-store"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useModalStore } from "../../../store/use-modal-store"
import Modal from "../../../components/modal"
import Button from "../../../components/button"
import { toast } from "react-toastify"
import { AfiliatorColumns } from "./_parts/columns"

const AfiliatorUserPage = () => {

  const {afiliators, getAfiliators, loading, attributes, deleteAfiliator} = useAfiliatorStore()
  const {isOpen, modalId, setModalState} = useModalStore()

  const init = async () => {
    await getAfiliators()
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
      await deleteAfiliator(id), init()
      setModalState({
        isOpen: false,
        modalId: null
      })
      toast.success('Berhasil menghapus afiliator')
    } catch (error) {
      toast.error('Gagal menghapus afiliator')
    }
  }

  return (
    <Layout>
      <Wrapper title="Afiliator User" subtitle="data afiliator">
        <div>
          <DataTable
            data={afiliators} 
            columns={AfiliatorColumns}
            attributes={attributes}
            loading={loading}
            fn={getAfiliators}
          >
            <div>
              <Link to={"/user/afiliator/create"} className="btn bg-gray-700 text-white"><Icon icon="solar:add-square-bold-duotone" className='text-xl' /> Buat Afiliator</Link>
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

export default AfiliatorUserPage