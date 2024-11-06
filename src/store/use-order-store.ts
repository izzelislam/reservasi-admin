import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  orders: any[]
  order: any
  attributes: any
  orderUrl: string
  searchResult: any
  getOrders: (page?: number, date?:any, status?:any) => Promise<any>
  confirmOrder: (id:string) => Promise<any>
  cancelOrder: (id:string) => Promise<any>
  searchOrders: (q: string) => Promise<any>
  resetSearch: () => void
}

const initState: State = {
  loading: false,
  orders: [],
  order: {},
  attributes: [],
  orderUrl: '',
  searchResult: [],
  getOrders: async () => {},
  confirmOrder: async () => {},
  cancelOrder: async () => {},
  searchOrders: async () => {},
  resetSearch: () => {},
}


export const useOrderStore = create<State>()((set) => ({
  ...initState,
  getOrders: async (page = 1, date, status) => {
    try {
      set({ loading: true })

      var dateFilter   = ''
      var statusFilter = ''

      if (date){
        const [startDate, endDate] = date
        dateFilter = `&start_booking_date=${startDate}&end_booking_date=${endDate}`
      }

      if (status){
        statusFilter = `&status=${status}`
      }
      
      
      const url:string = `/admin/orders?is_paginate=true&page=${page + dateFilter + statusFilter}`
        
      const res = await api.get(url)
      set({ loading: false, orders: res.data.data, attributes: res.data, orderUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  confirmOrder: async (id:string) => {
    try {
      set({ loading: true })
      const url = `/admin/orders/${id}`
      const res = await api.post(url)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error) 
    }
  },
  cancelOrder: async (id:string) => {
    try {
      set({ loading: true })
      const url = `/admin/orders/${id}`
      const res = await api.put(url)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error) 
    }
  },
  searchOrders: async (q: string) => {
    try {
      if (q != '' && q != null) {
        set({ loading: true })
        const url = `/admin/orders?q=${q}&status=booked`
        const res = await api.get(url)
        set({ loading: false, searchResult: res.data })
        return Promise.resolve(res.data)
      }
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },
  resetSearch: () => {
    set({ searchResult: [] })
  },
}))