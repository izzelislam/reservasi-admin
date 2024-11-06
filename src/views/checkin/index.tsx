import { useEffect, useState } from "react"
import CustomInput from "../../components/custom-input"
import DataTable from "../../components/data-table"
import Layout from "../../components/layout"
import Wrapper from "../../components/wrapper"
import { useActivityStore } from "../../store/use-activity-store"
import { activityColumns } from "./parts/columns"
import Modal from "../../components/modal"
import Button from "../../components/button"
import CheckinModalCOntent from "./parts/checkin-modal-content"
import CheckinOrderManual from "./parts/checkin-order-manual"
import { useModalStore } from "../../store/use-modal-store"
import { toast } from "react-toastify"
import { objectToText } from "../../lib/object-to-text"

const CheckInPage = () => {
  const {loading, activitys, getActivitys, attributes, checkInOut} = useActivityStore()
  const [showCheckinModal, setShowCheckinModal] = useState<boolean>(false)
  const {isOpen, modalId, mode, setModalState} = useModalStore()

  const init = async () => {
    await getActivitys()
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
  
  const handleCheckOut = async (id: string) => {
    try {
      await checkInOut({
        'order_id': id,
        'type': 'out'
      })

      await getActivitys()
      toast.success('Berhasil checkout')

    } catch (error:any) {
      toast.error(objectToText(error.data.message))
    }

    handleClose()
  }

  return (
    <Layout>
      <Wrapper title="Check In" subtitle="Check In">
        <div className="">
          <CustomInput 
            type="text"
            disabled={false}
            placeholder="Checkin berdasarkan nama / kode booking/ email"
            onFocus={() => setShowCheckinModal(true)}
          />
        </div>
      </Wrapper>
      <Wrapper>
        <DataTable
            data={activitys} 
            columns={activityColumns}
            attributes={attributes}
            loading={loading}
            fn={getActivitys}
          >
            <div className="flex flex-wrap gap-3">
              {/* <Link to={"/post/info/create"} className="btn bg-gray-700 text-white"><Icon icon="solar:add-square-bold-duotone" className='text-xl' /> Buat Info</Link> */}

              {/* <DatePicker
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
              /> */}
            </div>
          </DataTable>
      </Wrapper>

      <Modal visible={showCheckinModal} onClose={() => setShowCheckinModal(false)} styles="">
        <div>
          <CheckinModalCOntent onClose={() => setShowCheckinModal(false)}/>
          <CheckinOrderManual onClose={() => setShowCheckinModal(false)}/>
        </div>
        <div>
          <Button
            icon="solar:close-square-bold-duotone"
            onClick={() => setShowCheckinModal(false)}
            title="Tutup"
          />
        </div>
      </Modal>

      <Modal visible={isOpen && mode === 'checkout'} onClose={() => handleClose()} styles="">
        <div className="text-center">
          <p className="text-lg font-semibold">Konfirmasi Checkout</p>
          <p className="text-gray-500">Apakah anda yakin ingin checkout ?</p>
        </div>
        <div className="flex gap-3 justify-center">
          <div>
            <Button
              icon="solar:close-square-bold-duotone"
              onClick={() => handleClose()}
              title="Tutup"
            />
          </div>
          <div>
            <Button
              bg="bg-red-600"
              icon="solar:close-square-bold-duotone"
              onClick={() => handleCheckOut(modalId)}
              title="Check Out"
            />
          </div>
        </div>
      </Modal>

    </Layout>
  )
}

export default CheckInPage