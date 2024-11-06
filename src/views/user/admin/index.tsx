import { useEffect } from "react"
import DataTable from "../../../components/data-table"
import Layout from "../../../components/layout"
import Wrapper from "../../../components/wrapper"
import { useAdminStore } from "../../../store/use-admin-store"
import { AdminColumns } from "./_parts/columns"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useModalStore } from "../../../store/use-modal-store"
import Modal from "../../../components/modal"
import Button from "../../../components/button"
import { toast } from "react-toastify"

const AdminUserPage = () => {

  const {admins, getAdmins, loading, attributes, deleteAdmin} = useAdminStore()
  const {isOpen, modalId, setModalState} = useModalStore()

  const init = async () => {
    await getAdmins()
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
      await deleteAdmin(id), init()
      setModalState({
        isOpen: false,
        modalId: null
      })
      toast.success('Berhasil menghapus admin')
    } catch (error) {
      toast.error('Gagal menghapus admin')
    }
  }

  return (
    <Layout>
      <Wrapper title="Admin User" subtitle="data admin">
        <div>
          <DataTable
            data={admins} 
            columns={AdminColumns}
            attributes={attributes}
            loading={loading}
            fn={getAdmins}
          >
            <div>
              <Link to={"/user/admin/create"} className="btn bg-gray-700 text-white"><Icon icon="solar:add-square-bold-duotone" className='text-xl' /> Buat Admin</Link>
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

export default AdminUserPage