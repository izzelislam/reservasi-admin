import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  admins: any[]
  admin: any
  attributes: any
  adminUrl: string
  getAdmins: (page?: number) => Promise<any>
  createAdmin: (data: any) => Promise<any>
  updateAdmin: (data: any, id: string) => Promise<any>
  deleteAdmin: (id: string) => Promise<any>
  showAdmin: (id: string) => Promise<any>
}

const initState: State = {
  loading: false,
  admins: [],
  admin: {},
  attributes: [],
  adminUrl: '',
  getAdmins: async () => {},
  createAdmin: async () => {},
  updateAdmin: async () => {},
  deleteAdmin: async () => {},
  showAdmin: async () => {},
}


export const useAdminStore = create<State>()((set) => ({
  ...initState,
  getAdmins: async (page = 1) => {
    try {
      
      set({ loading: true })
      const url:string = `/admin/admins?is_paging=true&page=${page}`
      const res = await api.get(url)
      set({ loading: false, admins: res.data.data, attributes: res.data, adminUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  createAdmin: async (data:any) => {
    try {
      set({ loading: true })

      const payload = new FormData()
      payload.append('image', data.image[0])
      payload.append('name', data.name)
      payload.append('email', data.email)
      payload.append('password', data.password)
      payload.append('phone', data.phone)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await api.post('/admin/admins', payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  updateAdmin: async (data:any, id:string) => {
    try {
      set({ loading: true })

      const payload = new FormData()
      
      if (data.image[0]){
        payload.append('image', data.image[0])
      }
      payload.append('name', data.name)
      payload.append('email', data.email)
      payload.append('password', data.password)
      payload.append('phone', data.phone)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await api.post(`/admin/admins/${id}`, payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  deleteAdmin: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.delete(`/admin/admins/${id}`)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  showAdmin: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.get(`/admin/admins/${id}`)
      set({ loading: false, admin: res.data })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
}))