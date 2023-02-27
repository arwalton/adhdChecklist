import {create} from 'zustand'

const useRoutineStore = create((set) => ({
    // The array to store the routines
    routines: [],
    /**
     * Set the initial routines state
     * 
     * @param {*} routines - An array of routines
     * @returns 
     */
    setRoutines: (routines) => set((state) => ({
        routines: routines
    })),
    /**
     * Add a routine to the state
     * 
     * @param {*} routine - A routine to be added
     * @returns 
     */
    addRoutine: (routineToAdd) => set((state) => ({
        routines: [...state.routines, routineToAdd]
    })),
    /**
     * Remove a routine from state
     * 
     * @param {*} routineNameToRemove - Name of the routine to remove
     * @returns 
     */
    removeRoutine: (routineNameToRemove) => set((state) => ({
        routines: state.routines.filter(() => {
            return routineNameToRemove !== routine.name
        })
    })),
    /**
     * Remove all routines and reset state
     * @returns 
     */
    removeAllRoutines: () => set({routines: []}),
    /**
     * Updates a specific routine in state
     * 
     * @param {*} routineToUpdate - The routine to be updated
     * @returns 
     */
    updateRoutine: (routineToUpdate) => set((state) => ({
        routines: state.routines.map((routine) => {
            if(routine.name === routineToUpdate.name){
                return routineToUpdate
            }
            return routine
        })
    })),
}))

export default useRoutineStore;