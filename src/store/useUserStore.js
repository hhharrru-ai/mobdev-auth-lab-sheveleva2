import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      session: undefined,
      
      setSession: (sessionData) => set({ session: sessionData }),
      
      clearSession: () => set({ session: undefined }),
    }),
    {
      name: 'user-storage', 
    }
  )
)

export default useUserStore