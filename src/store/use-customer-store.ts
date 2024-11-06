import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  customers: any[]
  customer: any
  attributes: any
  customerUrl: string
  getCustomers: (page?: number) => Promise<any>
  createCustomer: (data: any) => Promise<any>
  updateCustomer: (data: any, id: string) => Promise<any>
  deleteCustomer: (id: string) => Promise<any>
  showCustomer: (id: string) => Promise<any>
}

const initState: State = {
  loading: false,
  customers: [],
  customer: {},
  attributes: [],
  customerUrl: '',
  getCustomers: async () => {},
  createCustomer: async () => {},
  updateCustomer: async () => {},
  deleteCustomer: async () => {},
  showCustomer: async () => {},
}


export const useCustomerStore = create<State>()((set) => ({
  ...initState,
  getCustomers: async (page = 1) => {
    try {
      
      set({ loading: true })
      const url:string = `/admin/customers?is_paging=true&page=${page}`
      const res = await api.get(url)
      set({ loading: false, customers: res.data.data, attributes: res.data, customerUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  createCustomer: async (data:any) => {
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

      const res = await api.post('/admin/customers', payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  updateCustomer: async (data:any, id:string) => {
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

      const res = await api.post(`/admin/customers/${id}`, payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  deleteCustomer: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.delete(`/admin/customers/${id}`)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  showCustomer: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.get(`/admin/customers/${id}`)
      set({ loading: false, customer: res.data })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
}))