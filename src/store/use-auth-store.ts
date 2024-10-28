import { create } from 'zustand'
import { UserType } from '../variables/users'
import api from '../lib/api'

type State = {
  loading: boolean 
  user: any
  is_auth: boolean
  login: (data: any) => Promise<any>
  logout: () => Promise<any>
}

const initState: State = {
  loading: false,
  user: {},
  is_auth: false,
  login: async () => {},
  logout: async () => {}
}

export const useAuthStore = create<State>()((set) => ({
  ...initState,
  login: async (data:any) => {
    try {
      set({ loading: true })
      const res = await api.post('/admin/login', data)
      set({ loading: false, user: res.data, is_auth: true })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  logout: async () => {
    try {
      set({ loading: true })
      const res = await api.get('/admin/logout')
      set({ loading: false, user: {}, is_auth: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  }
}))