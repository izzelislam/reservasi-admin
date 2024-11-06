import { create } from 'zustand'
import api from '../lib/api'

type State = {
  loading: boolean 
  user: any
  is_auth: boolean
  login: (data: any) => Promise<any>
  logout: () => Promise<any>
  getProfile: () => Promise<any>
}

const initState: State = {
  loading: false,
  user: {},
  is_auth: false,
  login: async () => {},
  logout: async () => {},
  getProfile: async () => {}
}

export const useAuthStore = create<State>()((set) => ({
  ...initState,
  login: async (data:any) => {
    try {
      set({ loading: true })
      const res = await api.post('/admin/login', data)
      set({ loading: false, is_auth: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  logout: async () => {
    try {
      set({ loading: true })
      const res = await api.post('/admin/logout')
      set({ loading: false, user: {}, is_auth: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  getProfile: async () => {
    try {
      set({ loading: true })
      const res = await api.get('/admin/me')
      set({ loading: false, user: res.data, is_auth: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  }
}))