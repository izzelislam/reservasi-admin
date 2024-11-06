import CustomInput from '../../../components/custom-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnRedo, BtnStrikeThrough, BtnUndo, createButton, Editor, EditorProvider, Toolbar } from 'react-simple-wysiwyg'
import { z } from 'zod'
import Button from '../../../components/button'
import { useEffect, useState } from 'react'
import { useRoomStore } from '../../../store/use-room-store'
import { toast } from 'react-toastify'
import { objectToText } from '../../../lib/object-to-text'
import { useNavigate, useParams } from 'react-router-dom'

const roomScheme = z.object({
  name: z.string().min(1, "Nama harus diisi").max(500, "Nama maksimal 500 karakter"),
  capacity: z.string().min(1, "Kapasitas harus diisi").max(50, "Kapasitas maksimal 500 karakter"),
  price: z.string().min(1, "Harga harus diisi").max(500, "Harga maksimal 500 karakter"),
})

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
const BtnAlingLeft = createButton('Align left', '≡', 'justifyLeft');
const BtnAlignRight = createButton('Align right', '≡', 'justifyRight');

const RoomFormField = () => {

  const [info, setInfo] = useState('')
  const [description, setDescription] = useState('')

  const {loading ,crateRoom, getRooms, showRoom, updateRoom} = useRoomStore() 

  const route = useNavigate()
  const { id } = useParams<{ id: string }>()

  const {register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof roomScheme>>({
    resolver: zodResolver(roomScheme),
    defaultValues: {
      name: "",
      capacity: "",
      price: "",
    }
  })

  useEffect(() => {
    handleShow()
  }, [id])

  const handleShow = async () => {
    if (id){
      const res = await showRoom(id)
      setInfo(res.info)
      setDescription(res.description)
      reset({name: res.name, capacity: res.capacity, price: res.price})
    }
  }

  const onSubmit = async (data: z.infer<typeof roomScheme>) => {
    try {
       if (id){
         const payload = {...data, info, description}
         await updateRoom(payload, id)
         await getRooms()
         route(`/room`)

       } else{
         const payload = {...data, info, description}
         const res = await crateRoom(payload)
         await getRooms()
         route(`/room/create/${res.id}`)
       }

      toast.success(objectToText("Berhasil membuat kamar"))
    } catch (error:any) {
      toast.error(objectToText(error.data.message))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput 
            type="text" 
            placeholder="Nama Kamar/Rungan" 
            label='Nama Kamar/Rungan'
            error={errors.name?.message}
            register={register}
            name="name"
          />
          <CustomInput 
            type="number" 
            placeholder="Kapasitas orang" 
            label='Kapasitas orang'
            error={errors.name?.message}
            register={register}
            name="capacity"
          />
          <CustomInput 
            type="number" 
            placeholder="Rp." 
            label='Harga @malam'
            error={errors.name?.message}
            register={register}
            name="price"
          />

          <div className='mb-4'>
            <EditorProvider>
              <p className='text-sm mb-1'>Deskripsi Kamar</p>
              <Editor name='description'  value={description} onChange={e => setDescription(e.target.value)}>
                <Toolbar>
                  <BtnUndo/>
                  <BtnRedo />
                  <BtnBold />
                  <BtnItalic />
                  <BtnStrikeThrough/>
                  <BtnLink/>
                  <BtnBulletList/>
                  <BtnAlignCenter />
                  <BtnAlingLeft />
                  <BtnAlignRight />
                </Toolbar>
              </Editor>
            </EditorProvider>
          </div>

          <div className='mb-4'>
            <EditorProvider>
              <p className='text-sm mb-1'>Informasi Tambahan</p>
              <Editor name='description'  value={info} onChange={e => setInfo(e.target.value)}>
                <Toolbar>
                  <BtnUndo/>
                  <BtnRedo />
                  <BtnBold />
                  <BtnItalic />
                  <BtnStrikeThrough/>
                  <BtnLink/>
                  <BtnBulletList/>
                  <BtnAlignCenter />
                  <BtnAlingLeft />
                  <BtnAlignRight />
                </Toolbar>
              </Editor>
            </EditorProvider>
          </div>

          <div className='  md:max-w-[300px]'>
            <Button loading={loading} disabled={loading} icon='solar:folder-check-bold-duotone' title="Simpan" />
          </div>

        </form>
    </div>
  )
}


export default RoomFormField