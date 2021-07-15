import React from 'react'
import create from 'zustand'


export const useStore = create(set => ({
    bears: 3,
    playing: false,
    increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    playRadio: () => set({ playing: false }),
    pauseRadio: () => set({ playing: true })
}))
  
export function BearCounter() {
    const bears = useStore(state => state.bears)
    console.log("BEARS" + bears)
    return bears
}

