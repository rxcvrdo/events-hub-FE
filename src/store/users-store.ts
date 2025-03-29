import { create } from 'zustand'
import { UserType } from '../interfaces'

const usersGlobalStore = create((set) => ({
    currentUser: null,
    setCurrentUser: (user:UserType) => set({ currentUser: user }),
    logout: () => set({ currentUser: null }),
})) 

export default usersGlobalStore

export interface UserStoreType {
    currentUser: UserType | null
    setCurrentUser: (user:UserType) => void
}