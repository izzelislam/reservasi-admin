import {create} from 'zustand'
import api from '../lib/api'

interface State {
  loading: boolean
  activitys: any[]
  activity: any
  attributes: any
  activityUrl: string
  getActivitys: (page?: number, date?:any, q?:any) => Promise<any>
  checkInOut: (data: any) => Promise<any>
}

const initState: State = {
  loading: false,
  activitys: [],
  activity: {},
  attributes: [],
  activityUrl: '',
  getActivitys: async () => {},
  checkInOut: async () => {},
}


export const useActivityStore = create<State>()((set) => ({
  ...initState,
  getActivitys: async (page = 1, date, q) => {
    try {
      set({ loading: true })

      var dateFilter   = ''
      var qFilter = ''

      if (date){
        const [startDate, endDate] = date
        dateFilter = `&check_in_at=${startDate}&check_out_at=${endDate}`
      }

      if (q){
        qFilter = `&status=${q}`
      }
      
      
      const url:string = `/admin/activities?is_paginate=50&page=${page + dateFilter + qFilter}`
        
      const res = await api.get(url)
      set({ loading: false, activitys: res.data.data, attributes: res.data, activityUrl: url })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  },

  checkInOut: async (data) => {
    try {
      set({ loading: true })
      const res = await api.post(`/admin/activities`, data)
      set({ loading: false })
      return Promise.resolve(res.data)
    } catch (error) {
      set({ loading: false })
      return Promise.reject(error)
    }
  }
}))