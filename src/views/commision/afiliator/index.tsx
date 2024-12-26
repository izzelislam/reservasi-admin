import { useEffect } from "react"
import { toast } from "react-toastify"
import { useModalStore } from "../../../store/use-modal-store"
import Layout from "../../../components/layout"
import Wrapper from "../../../components/wrapper"
import DataTable from "../../../components/data-table"
import Modal from "../../../components/modal"
import Button from "../../../components/button"
import "react-datepicker/dist/react-datepicker.css";
import { comissionColumns } from "./_parts/columns"
import { useCommisionStore } from "../../../store/use-commision-store"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { objectToText } from "../../../lib/object-to-text"
import CustomInput from "../../../components/custom-input"

const formSchema = z.object({
  amount: z.string().nonempty('Jumlah harus diisi').max(500, 'Jumlah maksimal 500 karakter'),
})

const CommisionPage = () => {

  const {loading, commisions, attributes, getCommisions, creditCommision} = useCommisionStore()
  const {isOpen, modalId, mode, setModalState} = useModalStore()


  const init = async () => {
    await getCommisions()
  }

  useEffect(() => {
    init()
  }, [])


  const handleClose = () => {
    setModalState({
      isOpen: false,
      modalId: null,
      mode: ''
    })
  }


  const {register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await creditCommision({...data, user_id : modalId})
    } catch (error:any) {
      toast.error(objectToText(error.data.message))
    }
    await init()
    handleClose()
    reset()
  }

  return (
    <Layout>
      <Wrapper title="Komisi Afiliator/Mitra" subtitle="data komisi afiliator/mitra">
        <div>
          <DataTable
            data={commisions} 
            columns={comissionColumns}
            attributes={attributes}
            loading={loading}
            fn={getCommisions}
          />
        </div>
      </Wrapper>
      
      <Modal visible={isOpen && mode== 'paid'} onClose={handleClose}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-xl font-bold text-center'>Pembayaran Komisi</h2>
          
            <CustomInput 
              type="number"
              placeholder="Jumlah"
              name="amount"
              label="Jumlah"
              register={register}
              error={errors.amount?.message}
            />

            <div className="flex justify-center gap-2">
              <div>
                <Button type="button" bg="bg-gray-600" onClick={handleClose} title='Batal' icon='solar:close-square-bold-duotone' />
              </div>
              <div>
                <Button bg='bg-sky-700' loading={loading} disabled={loading} type="submit" title='Bayarkan' icon='solar:leaf-bold-duotone' />
              </div>
            </div>
          </form>
        </div>
      </Modal>


    </Layout>
  )
}

export default CommisionPage