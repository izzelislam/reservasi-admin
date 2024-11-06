import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  categorys: any[]
  category: any
  attributes: any
  categoryUrl: string
  getCategorys: (page?: number) => Promise<any>
  getCategorysNoPaginate: () => Promise<any>
  createCategory: (data: any) => Promise<any>
  updateCategory: (data: any, id: string) => Promise<any>
  deleteCategory: (id: string) => Promise<any>
  showCategory: (id: string) => Promise<any>
}

const initState: State = {
  loading: false,
  categorys: [],
  category: {},
  attributes: [],
  categoryUrl: '',
  getCategorys: async () => {},
  getCategorysNoPaginate: async () => {},
  createCategory: async () => {},
  updateCategory: async () => {},
  deleteCategory: async () => {},
  showCategory: async () => {},
}


export const useCategoryStore = create<State>()((set) => ({
  ...initState,
  getCategorys: async (page = 1) => {
    try {
      
      set({ loading: true })
      const url:string = `/admin/categories?is_paginate=true&page=${page}`
      const res = await api.get(url)
      console.log(res)
      set({ loading: false, categorys: res.data.data, attributes: res.data, categoryUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },

  getCategorysNoPaginate: async () => {
    try {
      set({ loading: true })
      const url:string = `/admin/categories`
      const res = await api.get(url)
      set({ loading: false, categorys: res.data, attributes: res.data, categoryUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  createCategory: async (data:any) => {
    try {
      set({ loading: true })

      const res = await api.post('/admin/categories', data)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  updateCategory: async (data:any, id:string) => {
    try {
      set({ loading: true })

      const res = await api.put(`/admin/categories/${id}`, data)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  deleteCategory: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.delete(`/admin/categories/${id}`)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  showCategory: async (id:string) => {
    try {
      set({ loading: true })
      const res = await api.get(`/admin/categories/${id}`)
      set({ loading: false, category: res.data })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
}))