import { create } from 'zustand'
import api from '../lib/api'
import Cookies from 'js-cookie'

type State = {
  loading: boolean 
  user: any
  is_auth: boolean
  role: any
  login: (data: any) => Promise<any>
  logout: () => Promise<any>
  getProfile: () => Promise<any>
}

const initState: State = {
  loading: false,
  user: {},
  is_auth: false,
  role: null,
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

      set({ loading: false, is_auth: true , role: res.data.role})
      await Cookies.set('token', res.data.token);

      // intercept api header token 
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`

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

      await Cookies.remove('token');

      // set header token to null
      api.defaults.headers.common["Authorization"] = null

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
      set({ loading: false, user: res.data, is_auth: true , role: res.data.role})
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  }
}))