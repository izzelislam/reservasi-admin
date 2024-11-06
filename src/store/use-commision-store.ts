import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  commisions: any[]
  commision: any
  attributes: any
  commisionUrl: string,
  total: number|string
  paidCommisionVendor: any
  getCommisions: (page?: number, q?:any) => Promise<any>
  creditCommision: (data: any) => Promise<any>
  getCommisionVendor: (month?: string, year?: string) => Promise<any>
  getPaidCommision: (month?: string, year?: string) => Promise<any>
}

const initState: State = {
  loading: false,
  commisions: [],
  commision: {},
  attributes: [],
  commisionUrl: '',
  total: 0,
  paidCommisionVendor: {},
  getCommisions: async () => {},
  creditCommision: async () => {},
  getCommisionVendor: async () => {},
  getPaidCommision: async () => {},
}


export const useCommisionStore = create<State>()((set) => ({
  ...initState,
  getCommisions: async (page = 1, q) => {
    try {
      set({ loading: true })

      var qFilter   = ''

      if (q){
        qFilter = `&q=${q}`
      }

      const url:string = `/admin/commision?is_paginate=true&page=${page + qFilter}`
        
      const res = await api.get(url)
      set({ loading: false, commisions: res.data.data, attributes: res.data, commisionUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  creditCommision : async (data) => {
    try {
      set({ loading: true })
      const url = `/admin/commision`
      const res = await api.post(url, data)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  getCommisionVendor: async (month?: string, year?: string) => {
    try {
      set({ loading: true })

      var url = `/admin/commision-vendor`

      if (month && year){
        url += `?month=${month}&year=${year}`
      }

      if (month && !year){
        url += `?month=${month}`
      }

      if (!month && year){
        url += `?year=${year}`
      }

      const res = await api.get(url)
      
      set({ loading: false, commisions: res.data.commision.data, attributes: res.data.commision, commisionUrl: url, total: res.data.total })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  getPaidCommision: async (month?: string, year?: string) => {
    try {
      set({ loading: true })
      var url = `/admin/commision-paid`
      
      if (month && year){
        url += `?month=${month}&year=${year}`
      }

      if (month && !year){
        url += `?month=${month}`
      }

      if (!month && year){
        url += `?year=${year}`
      }

      console.log(month, year)

      const res = await api.get(url)
      set({ loading: false, paidCommisionVendor: res.data })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  }
 
}))