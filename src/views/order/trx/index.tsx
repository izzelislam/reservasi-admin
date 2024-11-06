import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useModalStore } from "../../../store/use-modal-store"
import Layout from "../../../components/layout"
import Wrapper from "../../../components/wrapper"
import DataTable from "../../../components/data-table"
import Modal from "../../../components/modal"
import Button from "../../../components/button"
import { useOrderStore } from "../../../store/use-order-store"
import { orderColumns } from "./_parts/columns"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from "../../../components/custom-select"
import { dateFilter } from "../../../lib/date_formater"

const statuses = [
  {
    id : "all",
    name : "semua"
  },
  {
    id : "pending",
    name : "Pending"
  },
  {
    id : "booked",
    name : "Dibooking"
  },
  {
    id : "finished",
    name : "Selesai"
  },
  {
    id : "canceled",
    name : "Dibatalkan"
  },
]


const OrderTrxPage = () => {

  const {loading, orders, attributes, getOrders, confirmOrder, cancelOrder} = useOrderStore()
  const {isOpen, modalId, mode, setModalState} = useModalStore()

  const [dateRange, setDateRange] = useState<any>([undefined, undefined]);
  const [startDate, endDate] = dateRange;


  const init = async () => {
    await getOrders()
  }

  useEffect(() => {
    init()
  }, [])


  useEffect(()=>{
    if(startDate && endDate){
      const dateFiltered:any = [dateFilter(startDate), dateFilter(endDate)]
      getOrders(undefined, dateFiltered, undefined)
    }

    if (!startDate && !endDate){
      getOrders()
    }
  },[dateRange])

  const handleClose = () => {
    setModalState({
      isOpen: false,
      modalId: null,
      mode: ''
    })
  }

  const handleConfirm = async (id: string) => {
    try {
      const res = await confirmOrder(id)
      await getOrders()
      init()
      setModalState({
        isOpen: false,
        modalId: null
      })
      toast.success(res.message)
    } catch (error:any) {
      toast.error(error.data.message)
    }

    setModalState({
      isOpen: false,
      modalId: null
    })
  }

  const handleCancel = async (id: string) => {
    try {
      const res = await cancelOrder(id)
      await getOrders()
      init()
      setModalState({
        isOpen: false,
        modalId: null,
        mode: ''
      })
      toast.success(res.message)
    } catch (error:any) {
      toast.error(error.data.message)
    }

    setModalState({
      isOpen: false,
      modalId: null,
      mode: ''
    })
  }

  const handleFilterStatus = async (e:any) => {
    const status = e.target.value
    if (status === 'all') {
      await getOrders()
      return
    }
    await getOrders(undefined, undefined, status)
  }

  return (
    <Layout>
      <Wrapper title="Pemesanan" subtitle="data pemesanan/booking">
        <div>
          <DataTable
            data={orders} 
            columns={orderColumns}
            attributes={attributes}
            loading={loading}
            fn={getOrders}
          >
            <div className="flex flex-wrap gap-3">
              {/* <Link to={"/post/info/create"} className="btn bg-gray-700 text-white"><Icon icon="solar:add-square-bold-duotone" className='text-xl' /> Buat Info</Link> */}

              <DatePicker
                placeholderText="filter berdasarkan tanggal"
                className="px-5 py-[10px] border border-gray-400 rounded-lg"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  console.log(update, 'cleared')
                  setDateRange(update);
                }}
                isClearable={true}
              />
              <CustomSelect
                name="status"
                placeholder="filter berdasarkan status"
                options={statuses}
                onChange={(e:any) => handleFilterStatus(e)}
              />
            </div>
          </DataTable>
        </div>
      </Wrapper>
      
      <Modal visible={isOpen && !mode} onClose={handleClose}>
        <div>
          <h2 className='text-xl font-bold text-center'>Konfirmasi booking</h2>
          <p className='text-center text-gray-500 my-2'>Apakah anda yakin ingin mengkonfirmasi booking ini ?</p>

          <div className="flex justify-center gap-2">
            <div>
              <Button type="button" bg="bg-gray-600" onClick={handleClose} title='Batal' icon='solar:close-square-bold-duotone' />
            </div>
            <div>
              <Button bg='bg-sky-700' loading={loading} disabled={loading} type="submit" onClick={() => handleConfirm(modalId)} title='Konfirmasi' icon='solar:leaf-bold-duotone' />
            </div>
          </div>
        </div>
      </Modal>

      <Modal visible={isOpen && mode === 'cancel'} onClose={handleClose}>
        <div>
          <h2 className='text-xl font-bold text-center'>Konfirmasi Pembatalan</h2>
          <p className='text-center text-gray-500 my-2'>Apakah anda yakin ingin membatalkan booking ini ?</p>

          <div className="flex justify-center gap-2">
            <div>
              <Button type="button" bg="bg-gray-600" onClick={handleClose} title='Batal' icon='solar:close-square-bold-duotone' />
            </div>
            <div>
              <Button bg='bg-sky-700' loading={loading} disabled={loading} type="submit" onClick={() => handleCancel(modalId)} title='Batalkan Pesanan' icon='solar:leaf-bold-duotone' />
            </div>
          </div>
        </div>
      </Modal>

    </Layout>
  )
}

export default OrderTrxPage