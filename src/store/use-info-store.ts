import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  infos: any[]
  info: any
  attributes: any
  infoUrl: string
  getInfos: (page?: number) => Promise<any>
  createInfo: (data: any) => Promise<any>
  updateInfo: (data: any, id: string) => Promise<any>
  deleteInfo: (id: string) => Promise<any>
  showInfo: (id: string) => Promise<any>
}

const initState: State = {
  loading: false,
  infos: [],
  info: {},
  attributes: [],
  infoUrl: '',
  getInfos: async () => {},
  createInfo: async () => {},
  updateInfo: async () => {},
  deleteInfo: async () => {},
  showInfo: async () => {},
}


export const useInfoStore = create<State>()((set) => ({
  ...initState,
  getInfos: async (page = 1) => {
    try {
      
      set({ loading: true })
      const url:string = `/admin/infos?is_paginate=true&page=${page}`
      const res = await api.get(url)
      set({ loading: false, infos: res.data.data, attributes: res.data, infoUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }

    

  },
  createInfo: async (data:any) => {
    try {
      set({ loading: true })

      const payload = new FormData()
      payload.append('image', data.image[0])
      payload.append('title', data.title)
      payload.append('description', data.description)
      payload.append('category_id', data.category_id)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await api.post('/admin/infos', payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  updateInfo: async (data:any, id:string) => {
    try {
      set({ loading: true })

      const payload = new FormData()
      
      if (data.image[0]){
        payload.append('image', data.image[0])
      }
      payload.append('title', data.title)
      payload.append('description', data.description)
      payload.append('category_id', data.category_id)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await api.post(`/admin/infos/${id}`, payload, config)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  deleteInfo: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.delete(`/admin/infos/${id}`)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  showInfo: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.get(`/admin/infos/${id}`)
      set({ loading: false, info: res.data })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
}))