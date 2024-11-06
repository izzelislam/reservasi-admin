import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { limitString } from '../../../lib/text-formater';
import Button from '../../../components/button';
import CustomInput from '../../../components/custom-input';
import { dateFilter } from '../../../lib/date_formater';
import api from '../../../lib/api';
import NoDataState from './no-data-state';
import NumberToIdr from '../../../lib/idr-formated';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { objectToText } from '../../../lib/object-to-text';
import { useActivityStore } from '../../../store/use-activity-store';

const formSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }).max(255, { message: "Nama maksimal 255 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }).max(255, { message: "Email maksimal 255 karakter" }),
  phone: z.string().min(1, { message: "Nomor Telepon wajib diisi" }).max(255, { message: "Nomor Telepon maksimal 255 karakter" })
})

const CheckinOrderManual = ({onClose}:any) => {

  const [isOpenAcc, setIsOpenAcc] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(null);
  const [resSearch, setResSearch] = useState<any>([])
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const {getActivitys} = useActivityStore()

  const onChange = async (dates:any) => {
    
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    try {
      const res = await api.get(`/admin/room-search?start_booking=${dateFilter(start)}&end_booking=${dateFilter(end)}`)
      setResSearch(res.data)
    } catch (error:any) {
      // toast.error(objectToText(error.data.message))
    }
    // if (start < end){
    // }
  };

  // calculate day
  const getDiff = (start: any, end: any) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const HandleCheckIn = async (data:z.infer<typeof formSchema> ) =>{

    if (!selectedRoom) {
      toast.error("Harap pilih kamar terlebih dahulu")
    }

    if (!startDate || !endDate) {
      toast.error("Harap pilih tanggal booking terlebih dahulu")
    }

    if (endDate < startDate) {
      toast.error("Harap pilih tanggal booking yang valid")
    }

    try {
      const payload = {
        ...data,
        room_id: selectedRoom.id,
        start_booking: dateFilter(startDate),
        end_booking: dateFilter(endDate),
      }

      await api.post("/admin/order-manual", payload)
      await getActivitys()

      toast.success("Berhasil melakukan order dan checkin")
    } catch (error:any) {
      toast.error(objectToText(error.data.message))
    }
    reset()
    onClose()
    setStartDate(null)
    setEndDate(null)
    setSelectedRoom(null)
  }

  useEffect(() => {
    setIsOpenAcc(false)
  }, [onClose])


  return (
    <>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-1" checked={isOpenAcc} onClick={() => setIsOpenAcc(!isOpenAcc)} />
        <div className="collapse-title text-sm font-medium">Order dan Checkin ofline/manual</div>
        <div className={`collapse-content bg-white ${isOpenAcc ? 'pt-4' : ''}`}>
          <div>
            <DatePicker
              className='bg-black w-[100px]'
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              selectsDisabledDaysInRange
              // exclude previous
              minDate={new Date() }
              inline
            />

            {
              startDate && endDate && (
                <div className='my-2 bg-lime-400 p-2 rounded-lg'>
                  <p className='text-sm font-semibold'>Tersedia tanggal Booking : {dateFilter(startDate)} - {dateFilter(endDate)}</p>
                </div>
              )
            }

            {
              resSearch.length &&
              resSearch.length < 0 ? <NoDataState />
              : resSearch.map((item: any, index: number) => (
                <div key={index} className={`my-3 border border-gray-200 rounded-lg p-3 flex justify-between flex-wrap items-center ${selectedRoom?.id === item.id ? 'bg-sky-100' : ''}`}>
                  <div className='flex gap-2 items-center'>
                    <img src={
                      item.room_galeries.length > 0 ? item.room_galeries[0].image_url: 'https://placehold.co/50x50'
                    } className='w-[50px] h-[50px] rounded-md'/>
                    <div>
                      <div className='text-sm'>{limitString(item.name, 25)}</div>
                      <div className='text-sm text-gray-500 font-semibold'>{NumberToIdr(item.price)}</div>
                    </div>
                  </div>
                  <div className='flex'>
                    <div>
                      <Button
                        onClick={() => setSelectedRoom(item)}
                        title='Pilih'
                        bg='bg-green-500 btn-sm'
                      />
                    </div>
                  </div>
                </div>
              ))
            }

            {
              selectedRoom &&
              <div className='my-3 border border-gray-200 rounded-lg p-3'>
                <p className='text-sm font-semibold mb-2'>{selectedRoom.name}</p>
                <div className='flex justify-between text-sm'>
                  <p>Harga</p>
                  <p>{NumberToIdr(selectedRoom.price)}</p>
                </div>
                <div className='flex justify-between text-sm'>
                  <p>Hari</p>
                  <p>{getDiff(startDate, endDate)} Hari</p>
                </div>
                <div className='flex justify-between text-sm font-semibold text-sky-500'>
                  <p>Total Bayar</p>
                  <p>{NumberToIdr(selectedRoom.price * getDiff(startDate, endDate))}</p>
                </div>
              </div>
            }

            <div>
              <form onSubmit={handleSubmit(HandleCheckIn)}>
                <CustomInput
                  type="text"
                  placeholder="Nama pelanggan"
                  label="Nama pelanggan"
                  name='name'
                  register={register}
                  error={errors.name?.message}
                />
                <CustomInput
                  type="text"
                  placeholder="Email"
                  label="email aktif"
                  name='email'
                  register={register}
                  error={errors.email?.message}
                />
                <CustomInput
                  type="number"
                  placeholder="No Whatsapp"
                  label="No Whatsapp pelanggan"
                  name='phone'
                  register={register}
                  error={errors.phone?.message}
                />

                <Button
                  title='Order dan Checkin'
                  bg='bg-green-500'
                  type='submit'
                />
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CheckinOrderManual