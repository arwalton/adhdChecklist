import {create} from 'zustand'

const useRoutineStore = create((set) => ({
    routines: [],
    setRoutines: (routines) => set((state) => ({
        routines: routines
    })),
    addRoutine: (routine) => set((state) => ({
        routines: [...state.routines, routine]
    })),
    removeRoutine: (routineName) => set((state) => ({
        routines: state.routines.filter((routine) => {
            return routineName !== routine.name
        })
    })),
}))

export default useRoutineStore;