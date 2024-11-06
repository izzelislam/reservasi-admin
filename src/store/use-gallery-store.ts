import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  gallerys: any[]
  gallery: any
  galleryUrl: string
  getGallerys: (room_id?: string) => Promise<any>
  crateGallery: (data: any) => Promise<any>
  deleteGallery: (id: string) => Promise<any>
}

const initState: State = {
  loading: false,
  gallerys: [],
  gallery: {},
  galleryUrl: '',
  getGallerys: async () => {},
  crateGallery: async () => {},
  deleteGallery: async () => {},
}


export const useGalleryStore = create<State>()((set) => ({
  ...initState,
  getGallerys: async (room_id = '') => {
    try {
      
      set({ loading: true })
      const url:string = `/admin/room-galleries?room_id=${room_id}`
      const res = await api.get(url)
      set({ loading: false, gallerys: res.data , galleryUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  crateGallery: async (data:any) => {
    try {
      set({ loading: true })

      const payload = new FormData()
      payload.append('photo', data.photo[0])
      payload.append('room_id', data.room_id)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await api.post('/admin/room-galleries', payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  deleteGallery: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.delete(`/admin/room-galleries/${id}`)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
}))