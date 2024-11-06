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
import { useEffect } from "react"
import { useCategoryStore } from "../../store/use-category-store"


const formSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }).max(255, { message: "Nama maksimal 255 karakter" }),
})

const CategoryFormPage = () => {

  const {loading, createCategory, getCategorys, showCategory, updateCategory} = useCategoryStore()

  const router = useNavigate()
  const params = useParams()
  const {id}   = params


  const init = async () => {
    if (id){
      const res = await showCategory(id)
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
    }
  })

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (id) {
        await updateCategory(data, id)
      }else{
        await createCategory(data)
      }

      await getCategorys()
      reset()
      router('/post/category')
      toast.success("Berhasil menyimpan category")
    } catch (error:any) {
      toast.error(objectToText(error.data.message))
    }
  }

  return (
    <Layout>
      <Wrapper title="Kategori" subtitle="buat kategori postingan" back="/post/category">
        <form onSubmit={handleSubmit(onsubmit)}>
          <CustomInput 
            type="text" 
            placeholder="Nama category" 
            label='Nama Category'
            name="name" 
            register={register} 
            error={errors.name?.message}
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

export default CategoryFormPage