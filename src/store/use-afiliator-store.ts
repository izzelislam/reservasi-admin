import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  afiliators: any[]
  afiliator: any
  attributes: any
  afiliatorUrl: string
  getAfiliators: (page?: number) => Promise<any>
  createAfiliator: (data: any) => Promise<any>
  updateAfiliator: (data: any, id: string) => Promise<any>
  deleteAfiliator: (id: string) => Promise<any>
  showAfiliator: (id: string) => Promise<any>
}

const initState: State = {
  loading: false,
  afiliators: [],
  afiliator: {},
  attributes: [],
  afiliatorUrl: '',
  getAfiliators: async () => {},
  createAfiliator: async () => {},
  updateAfiliator: async () => {},
  deleteAfiliator: async () => {},
  showAfiliator: async () => {},
}


export const useAfiliatorStore = create<State>()((set) => ({
  ...initState,
  getAfiliators: async (page = 1) => {
    try {
      
      set({ loading: true })
      const url:string = `/admin/afiliators?is_paging=true&page=${page}`
      const res = await api.get(url)
      set({ loading: false, afiliators: res.data.data, attributes: res.data, afiliatorUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  createAfiliator: async (data:any) => {
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

      const res = await api.post('/admin/afiliators', payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  updateAfiliator: async (data:any, id:string) => {
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

      const res = await api.post(`/admin/afiliators/${id}`, payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  deleteAfiliator: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.delete(`/admin/afiliators/${id}`)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  showAfiliator: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.get(`/admin/afiliators/${id}`)
      set({ loading: false, afiliator: res.data })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
}))