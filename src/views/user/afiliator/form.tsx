import { z } from "zod"
import Layout from "../../../components/layout"
import Wrapper from "../../../components/wrapper"
import { ACCEPTED_IMAGE_TYPES } from "../../../constant/values"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from "../../../components/custom-input"
import { toast } from "react-toastify"
import { objectToText } from "../../../lib/object-to-text"
import Button from "../../../components/button"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useAfiliatorStore } from "../../../store/use-afiliator-store"


const formSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }).max(255, { message: "Nama maksimal 255 karakter" }),
  email: z.string().min(1, { message: "Email wajib diisi" }).max(255, { message: "Email maksimal 255 karakter" }),
  phone: z.string().min(1, { message: "Nomor Telepon wajib diisi" }).max(255, { message: "Nomor Telepon maksimal 255 karakter" }),
  password: z.string().min(1, { message: "Password wajib diisi" }).max(255, { message: "Password maksimal 255 karakter" }),
  image: z
  .any()
  .optional()
  .refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
    message: 'File size must be less than 5MB',
  })
  .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})

const AfiliatorFormPage = () => {

  const {loading, createAfiliator, getAfiliators, showAfiliator, updateAfiliator} = useAfiliatorStore()

  const router = useNavigate()
  const params = useParams()
  const {id}   = params


  const init = async () => {
    if (id){
      const res = await showAfiliator(id)
      delete res.photo
      reset(res)
    }
  }

  useEffect(() => {
    init()
  }, [])

  const {register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    }
  })

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (id) {
        await updateAfiliator(data, id)
      }else{
        await createAfiliator(data)
      }

      await getAfiliators()
      reset()
      router('/user/afiliator')
      toast.success("Berhasil menyimpan mitra")
    } catch (error:any) {
      toast.error(objectToText(error.data.message))
    }
  }

  return (
    <Layout>
      <Wrapper title="Afiliator User" subtitle="buat user admin" back="/user/afiliator">
        <form onSubmit={handleSubmit(onsubmit)}>
          <CustomInput 
            type="text" 
            placeholder="Nama pengguna Mitra" 
            label='Nama'
            name="name" 
            register={register} 
            error={errors.name?.message}
          />
          
          <CustomInput 
            type="text" 
            placeholder="Email pengguna Mitra" 
            label='Email' 
            name="email"
            register={register} 
            error={errors.email?.message}
          />
          
          <CustomInput 
            type="text" 
            placeholder="Nomor Telepon pengguna mitra" 
            label='Nomor Telepon' 
            name="phone"
            register={register} 
            error={errors.phone?.message}
          />

          <CustomInput 
            type="file" 
            placeholder="" 
            label='Photo Profile' 
            name="image"
            register={register} 
            error={errors.image?.message?.toString()}
          />
          
          <CustomInput 
            type="password" 
            placeholder="Password pengguna" 
            label='Password'
            name="password"
            register={register} 
            error={errors.password?.message}
          />

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

export default AfiliatorFormPage