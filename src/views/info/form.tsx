import { z } from "zod"
import Layout from "../../components/layout"
import Wrapper from "../../components/wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from "../../components/custom-input"
import { toast } from "react-toastify"
import { objectToText } from "../../lib/object-to-text"
import Button from "../../components/button"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useInfoStore } from "../../store/use-info-store"
import { useCategoryStore } from "../../store/use-category-store"
import CustomSelect from "../../components/custom-select"
import { ACCEPTED_IMAGE_TYPES } from "../../constant/values"
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnRedo, BtnStrikeThrough, BtnUndo, createButton, Editor, EditorProvider, Toolbar } from "react-simple-wysiwyg"


const formSchema = z.object({
  title: z.string().min(1, { message: "Nama wajib diisi" }).max(255, { message: "Nama maksimal 255 karakter" }),
  category_id: z.string().min(1, { message: "Kategori wajib diisi" }),
  image: z
    .any()
    .optional()
    .refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
      message: 'File size must be less than 5MB',
    })
    .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
const BtnAlingLeft = createButton('Align left', '≡', 'justifyLeft');
const BtnAlignRight = createButton('Align right', '≡', 'justifyRight');

const InfoFormPage = () => {

  const [description, setDescription] = useState('')
  const {loading, createInfo, getInfos, showInfo, updateInfo} = useInfoStore()
  const {categorys, getCategorysNoPaginate} = useCategoryStore()

  const router = useNavigate()
  const params = useParams()
  const {id}   = params


  const init = async () => {
    await getCategorysNoPaginate()
    if (id){
      const res = await showInfo(id)
      delete res.photo
      setDescription(res.description) 
      reset(res)
    }
  }

  useEffect(() => {
    init()
  }, [])

  const {register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category_id: '',
    }
  })

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (id) {
        await updateInfo({...data, description}, id)
      }else{
        await createInfo({...data, description})
      }

      await getInfos()
      reset()
      router('/post/info')
      toast.success("Berhasil menyimpan postingan")
    } catch (error:any) {
      toast.error(objectToText(error.data.message))
    }
  }

  return (
    <Layout>
      <Wrapper title="Postingan" subtitle="buat kategori postingan/artikel" back="/post/info">
        <form onSubmit={handleSubmit(onsubmit)}>
          <CustomInput 
            type="text" 
            placeholder="Judul postingan" 
            label='Judul'
            name="title" 
            register={register} 
            error={errors.title?.message}
          />

          <CustomSelect
            label="Kategori"
            name="category_id"
            register={register}
            options={categorys}
            error={errors.category_id?.message}
          />

          <CustomInput 
            type="file" 
            placeholder="" 
            label='Gambar'
            name="image" 
            register={register} 
            error={errors.image?.message?.toString()}
          />

          <div className='mb-4'>
            <EditorProvider>
              <p className='text-sm mb-1'>Informasi Tambahan</p>
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

          
          <div className="flex">
            <div>
              <Button loading={loading} disabled={loading} icon='solar:folder-check-bold-duotone' title="Simpan" />
            </div>
          </div>
        </form>
      </Wrapper>
    </Layout>
  )
}

export default InfoFormPage