import { StatusBar } from 'expo-status-bar';
import { 
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native';
import RoutineCard from './RoutineCard'
import SafeViewAndroid from '../helpers/SafeViewAndroid';
import TitleText from './TitleText';
import { Ionicons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import useRoutineStore from '../store/routineStore';

// const dummyData = {
//   "routines": [
//     {"name": "Morning Routine",
//       "steps":[
//         {"title": "Make bed",
//          "duration": 300},
//          {"title": "Shower and change",
//          "duration": 600},
//          {"title": "Eat breakfast",
//          "duration": 700}
//       ]
//     },
//     {"name": "Clean the kitchen",
//       "steps":[
//       {"title": "Start dishwasher",
//        "duration": 300},
//        {"title": "Wipe counters",
//        "duration": 600},
//        {"title": "Sweep floor",
//        "duration": 700}
//       ]
//     },
//     {"name": "Evening Routine",
//       "steps":[
//       {"title": "Brush teeth",
//        "duration": 150},
//        {"title": "Change",
//        "duration": 100},
//        {"title": "Read until lights out",
//        "duration": 1800}
//       ]
//     }
//   ]
// }

const iconWidth = 70;

export default RoutinesPage = ({navigation})=>{

  const routines = useRoutineStore((state) => state.routines)
  const setRoutines = useRoutineStore((state) => state.setRoutines)
  const addRoutine = useRoutineStore((state) => state.addRoutine)
  const removeRoutine = useRoutineStore((state) => state.removeRoutine)
  const { getItem, setItem } = useAsyncStorage("adhdChecklistRoutines");

  /**
   * Gets routines saved in local storage and saves them in the component state
   */
  const getRoutinesFromStorage = async () => {
    const routinesFromStorage = await getItem()
    setRoutines(JSON.parse(routinesFromStorage).routines)
  }

  /**
   * Sets routines in local storage.
   * newRoutines will be converted to JSON string within this function.
   * It should be an array of routine objects
   * @param {[]} newRoutines
   */
  const setRoutinesInStorage = async (newRoutines) => {
    await setItem(JSON.stringify(newRoutines))
    setRoutines(newRoutines)
  }

  /**
   * Adds a routine to the routines state and updates it in local storage.
   * routineToAdd should be a routine object
   * @param {{}}} routineToAdd 
   */
  const addRoutineInStorage = (routineToAdd) => {
    const newRoutines = [...routines, routineToAdd];
    setRoutinesInStorage(newRoutines)
  }

    //Little issue with this function
  // /**
  //  * Removes a routine from state and storage
  //  * @param {String} routineName 
  //  */
  // const removeRoutine = (routineName) => {
  //   const newRoutines = routines.filter((routine)=> {
  //     if(routine.name === routineName){
  //       return false
  //     }
  //   })
  //   setRoutinesInStorage(newRoutines)
  // }

  useEffect(() => {
    getRoutinesFromStorage()
  },[])

  return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={routines}
          renderItem={(routine, index) => (
            <RoutineCard
              routine={routine.item}
              key={"routine" + index}
            />
          )}
        />
        <View style={styles.addContainer}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={()=>{navigation.navigate("Routine Editor")}}
          >
            <Ionicons name="add" size={iconWidth} color="#BAFF29" />
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
    alignItems: 'center',
    paddingLeft: Dimensions.get("window").width * .025,
    paddingRight: Dimensions.get("window").width * .025,
  },
  addContainer: {
    flexGrow: 1,
    width: "100%",
  },
  opacity: {
    width: iconWidth
  },
  list: {
    flexGrow: 0,
    width: "100%",
    marginTop: 10,
  }
});
