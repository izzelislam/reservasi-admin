import { useEffect, useState } from "react"
import Button from "../../../components/button"
import Modal from "../../../components/modal"
import CustomSelect from "../../../components/custom-select"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from "../../../components/custom-input"
import { useFacilityStore } from "../../../store/use-facility-store"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Icon } from "@iconify/react/dist/iconify.js"

const facilisties = [
  {
    "id" : "solar:home-wifi-angle-bold-duotone",
    "name" : "Wifi"
  },
  {
    "id" : "solar:tv-bold-duotone",
    "name" : "TV"
  },
  {
    "id" : "solar:bath-bold-duotone",
    "name" : "Kamar Mandi"
  },
  {
    "id" : "solar:bed-bold-duotone",
    "name": "Kamar Tidur"
  },
  {
    "id" : "solar:traffic-economy-bold-duotone",
    "name" : "Parkir"
  },
  {
    "id" : "solar:wineglass-bold-duotone",
    "name" : "Dapur"
  },
  {
    "id" : "solar:streets-map-point-bold-duotone",
    "name" : "View Terbaik"
  }
]

const formSchema = z.object({
  name: z.string().min(1, "Fasilitas harus diisi").max(500, "Fasilitas maksimal 500 karakter"),
  icon: z.string().min(1, "Icon harus diisi").max(500, "Icon maksimal 500 karakter"),
})

const FacilityForm = () => {

  const [visible, setVisible] = useState(false)
  const {facilitys, loading, getFacilitys, createFacility, deleteFacility} = useFacilityStore()

  const params = useParams()
  const id = params.id

  const {register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      icon: ''
    }
  })

  useEffect(() => {
    if (id){
      init()
    }
  }, [id])

  const init = async () => {
    if (id){
      await getFacilitys(id)
    }
  }

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createFacility({...data, room_id: id})
      init(), setVisible(false), reset()
      toast.success("Berhasil tambah fasilitas")
    } catch (error) {
      toast.error("Gagal tambah fasilitas")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteFacility(id), init()
      toast.success('Berhasil menghapus fasilitas')
    } catch (error) {
      toast.error('Gagal menghapus fasilitas')
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-5'>
        <p className='text-lg font-semibold'>Fasiliatas</p>
        <div>
          <Button bg="btn-sm bg-gray-700" onClick={() => setVisible(true)} title='Tambah Fasiliatas' icon='solar:camera-add-bold-duotone' />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {
          facilitys.length > 0 ?
          facilitys.map((item:any, index:any) => (
            <div>
              <div key={index} className='flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-500'>
                <Icon icon={item.icon} className='text-lg' />
                <p>{item.name}</p>
              </div>
              <Button bg="bg-red-600 btn-sm" loading={loading} disabled={loading} onClick={() => handleDelete(item.id)} title='Hapus' icon='solar:trash-bin-minimalistic-bold-duotone' />
            </div>
          ))
          :
          <p>Tidak ada fasilitas</p>
        }
      </div>

      <Modal visible={visible} onClose={() => setVisible(false)}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <CustomSelect 
              name="icon"
              register={register} 
              label='Fasilitas' 
              placeholder='Pilih fasilitas' 
              options={facilisties}
            />
            <CustomInput 
              type="text" 
              placeholder="Nama Fasilitas" 
              label='Fasilitas'
              name="name"
              register={register} 
              error={errors.name?.message}
            />
            <div className="flex justify-end gap-2">
              <div>
                <Button type="button" bg="bg-sky-600" onClick={() => setVisible(false)} title='Batal' icon='solar:close-square-bold-duotone' />
              </div>
              <div>
                <Button loading={loading} disabled={loading} type="submit" onClick={() => setVisible(false)} title='Simpan' icon='solar:camera-add-bold-duotone' />
              </div>
            </div>
          </form>
      </Modal>
    </div>
  )
}

export default FacilityForm