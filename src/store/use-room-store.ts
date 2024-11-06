import {create} from 'zustand'
import { RoomType } from '../types/room-type'
import api from '../lib/api'

interface State {
  loading: boolean
  rooms: RoomType[]
  room: any
  attributes: any
  roomUrl: string
  getRooms: (page?: number) => Promise<any>
  crateRoom: (data: any) => Promise<any>
  updateRoom: (data: any, id: string) => Promise<any>
  deleteRoom: (id: string) => Promise<any>
  showRoom: (id: string) => Promise<any>
}

const initState: State = {
  loading: false,
  rooms: [],
  room: {},
  attributes: [],
  roomUrl: '',
  getRooms: async () => {},
  crateRoom: async () => {},
  updateRoom: async () => {},
  deleteRoom: async () => {},
  showRoom: async () => {},
}


export const useRoomStore = create<State>()((set) => ({
  ...initState,
  getRooms: async (page = 1) => {
    try {
      
      set({ loading: true })
      const url:string = `/admin/rooms?is_paging=true&page=${page}`
      const res = await api.get(url)
      set({ loading: false, rooms: res.data.data, attributes: res.data, roomUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  crateRoom: async (data:any) => {
    try {
      set({ loading: true })
      const res = await api.post('/admin/rooms', data)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  updateRoom: async (data:any, id:string) => {
    try {
      set({ loading: true })
      const res = await api.put(`/admin/rooms/${id}`, data)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  deleteRoom: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.delete(`/admin/rooms/${id}`)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  showRoom: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.get(`/admin/rooms/${id}`)
      set({ loading: false, room: res.data })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
}))