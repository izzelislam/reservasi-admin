import { toast } from 'react-toastify'
import Button from '../../../components/button'
import { stringToDate } from '../../../lib/date_formater'
import { useActivityStore } from '../../../store/use-activity-store'
import { objectToText } from '../../../lib/object-to-text'

const CheckInContent = ({orders, onClose}: {orders:any, onClose?: () => void}) => {

  const {loading, checkInOut} = useActivityStore()
  const {getActivitys} = useActivityStore()

  const handleCheckInOut = async (param:string) => {
    try {
      await checkInOut({
        order_id: param,
        type: 'in'
      })
      await getActivitys()
      toast.success('Berhasil checkin')
    } catch (error:any) {
      toast.error(objectToText(error.data.message))
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      {
        orders.map((item:any, index:number) => (
          <div key={index} className='border border-gray-300 p-4 rounded-lg'>
            <div className='flex justify-between my-1'>
              <p className='text-sm'>{item.user.name}</p>
              <p className='text-sm'>{item.user.phone}</p>
            </div>
            <div className='flex justify-between my-1'>
              <p className='text-sm'>Jadwal</p>
              <p className='text-sm'>{stringToDate(item.start_booking)} - {stringToDate(item.end_booking)}</p>
            </div>
            <div className='flex justify-between my-1'>
              <p className='text-sm'>Kode Booking</p>
              <p className='text-sm'>{item.trx}</p>
            </div>
            <div className='flex justify-between my-1'>
              <p className='text-sm'>Tanggal Booking</p>
              <p className='text-sm'>{stringToDate(item.order_date)}</p>
            </div>
            <div className='flex justify-between my-1'>
              <p className='text-sm'>Status Pembayaran</p>
              <p className='text-sm text-green-500'>Booked</p>
            </div>
            <div>
              <Button loading={loading} disabled={loading}   onClick={() => handleCheckInOut(item.id)} bg='bg-green-500' icon='solar:inbox-in-bold-duotone' title="Checkin" />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CheckInContent