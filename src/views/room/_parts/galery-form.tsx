import { useEffect, useState } from 'react'
import Button from '../../../components/button'
import Modal from '../../../components/modal'
import CustomInput from '../../../components/custom-input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGalleryStore } from '../../../store/use-gallery-store'
import { toast } from 'react-toastify'
import { objectToText } from '../../../lib/object-to-text'
import { useParams } from 'react-router-dom'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formScheme = z.object({
  photo: z
  .any()
  .optional()
  .refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
    message: 'File size must be less than 5MB',
  })
  .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})

const GalleryRoomField = () => {

  const [visible, setVisible] = useState(false)
  const { loading, crateGallery, deleteGallery, getGallerys, gallerys } = useGalleryStore()
  
  const  params = useParams()
  const id = params.id


  useEffect(() => {
    if (id){
      init()
    }
  }, [id])

  const init = async () => {
    await getGallerys(id)
    console.log(gallerys)
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme)
  })

  const onsubmit = async (data: z.infer<typeof formScheme>) => {
    try {
      await crateGallery({...data, room_id: id})
      await getGallerys(id) 
      reset()
      setVisible(false)
      toast.success("Berhasil upload photo")
    } catch (error:any) {
      // console.log(error)
      toast.error(objectToText(error.data.message))
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteGallery(id)
      init()
      toast.success('Berhasil menghapus photo')
    } catch (error) {
      toast.error('Gagal menghapus photo')
    }
  }

  return (
    <div>

      <div className='flex items-center justify-between mb-5'>
        <p className='text-lg font-semibold'>Galery</p>
        <div>
          <Button bg="btn-sm bg-gray-700" onClick={() => setVisible(true)} title='Tambah photo' icon='solar:camera-add-bold-duotone' />
        </div>
      </div>

      <div className='flex flex-wrap gap-4'>
        {
          gallerys?.length > 0 &&
          gallerys?.map((item: any, index: number) => (
            <div key={index} className=''>
              <img src={item?.image_url} alt="image" className='w-[150px] h-[100px] object-cover object-center rounded-lg' />
              <div>
                <Button bg='bg-red-600 btn-sm' onClick={() => handleDelete(item?.id)} title='Delete' icon='solar:trash-bin-minimalistic-bold-duotone' />
              </div>
            </div>
          ))
        }
      </div>

      <Modal visible={visible} onClose={() => setVisible(false)}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <CustomInput 
            type="file"
            name='photo'
            label='Upload Photo' 
            register={register}
            error={errors?.photo?.message?.toString()}
          />

          <div className='flex items-center justify-end gap-4'>
            <div>
              <Button bg='bg-sky-700' onClick={() => setVisible(false)} title='Batal' icon='solar:close-square-bold-duotone' type='button'/>
            </div>
            <div>
              <Button loading={loading} disabled={loading} type='submit' title='Simpan' icon='solar:upload-bold-duotone' />
            </div>
          </div>
        </form>
      </Modal>

    </div>
  )
}

export default GalleryRoomField