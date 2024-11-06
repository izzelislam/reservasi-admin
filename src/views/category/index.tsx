import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react/dist/iconify.js"
import { toast } from "react-toastify"
import { useCategoryStore } from "../../store/use-category-store"
import { useModalStore } from "../../store/use-modal-store"
import Layout from "../../components/layout"
import Wrapper from "../../components/wrapper"
import DataTable from "../../components/data-table"
import Modal from "../../components/modal"
import Button from "../../components/button"
import { categoryColumns } from "./_parts/columns"

const CategoryPage = () => {

  const {categorys, getCategorys, loading, attributes, deleteCategory} = useCategoryStore()
  const {isOpen, modalId, setModalState} = useModalStore()

  console.log(categorys)

  const init = async () => {
    await getCategorys()
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
      await deleteCategory(id), init()
      setModalState({
        isOpen: false,
        modalId: null
      })
      toast.success('Berhasil menghapus category')
    } catch (error) {
      toast.error('Gagal menghapus category')
    }
  }

  return (
    <Layout>
      <Wrapper title="Category" subtitle="data category">
        <div>
          <DataTable
            data={categorys} 
            columns={categoryColumns}
            attributes={attributes}
            loading={loading}
            fn={getCategorys}
          >
            <div>
              <Link to={"/post/category/create"} className="btn bg-gray-700 text-white"><Icon icon="solar:add-square-bold-duotone" className='text-xl' /> Buat Category</Link>
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

export default CategoryPage