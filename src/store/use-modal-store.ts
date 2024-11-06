import {create} from 'zustand'

type State = {
  isOpen: boolean
  modalId: any
  mode?: string
  setModalState: (data: any) => void
}

const initState: State = {
  isOpen: false,
  modalId: null,
  mode: '',
  setModalState: () => {},
}

export const useModalStore = create<State>()((set) => ({
  ...initState,
  setModalState: (data: any) => set((state) => ({ ...state, ...data })),
}))