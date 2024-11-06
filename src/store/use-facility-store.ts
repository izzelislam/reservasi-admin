import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  facilitys: any[]
  facility: any
  facilityUrl: string
  getFacilitys: (room_id?: string) => Promise<any>
  createFacility: (data: any) => Promise<any>
  deleteFacility: (id: string) => Promise<any>
}

const initState: State = {
  loading: false,
  facilitys: [],
  facility: {},
  facilityUrl: '',
  getFacilitys: async () => {},
  createFacility: async () => {},
  deleteFacility: async () => {},
}


export const useFacilityStore = create<State>()((set) => ({
  ...initState,
  getFacilitys: async (room_id = '') => {
    try {
      
      set({ loading: true })
      const url:string = `/admin/facilities/${room_id}`
      const res = await api.get(url)
      set({ loading: false, facilitys: res.data , facilityUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  createFacility: async (data:any) => {
    try {
      set({ loading: true })

      const res = await api.post('/admin/facilities', data)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  deleteFacility: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.delete(`/admin/facilities/${id}`)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
}))