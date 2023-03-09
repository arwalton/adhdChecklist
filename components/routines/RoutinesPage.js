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
import SafeViewAndroid from '../../helpers/SafeViewAndroid';
import TitleText from '../common/TitleText';
import { Ionicons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import useRoutineStore from '../../store/routineStore';

const dummyData = {
  "routines": [
    {"id": "e2fc1955-e9de-4ce7-9f58-039806a730ef",
      "name": "Morning Routine",
      "steps":[
        {"id": "8d0e21b4-7e0e-4fc2-a93a-952c40b98b2a",
          "title": "Make bed",
         "duration": 7},
         {"id": "6266e605-00b2-41ae-af82-80cda42f79a4",
          "title": "Shower and change",
         "duration": 10},
         {"id": "15e60546-ba32-44e7-922c-8d7711cd0b61",
          "title": "Eat breakfast",
         "duration": 20}
      ]
    },
    {"id": "3d12925f-cc62-4ee2-bd79-7f0388d6146c",
      "name": "Clean the kitchen",
      "steps":[
      {"id": "f6400cb4-c9b6-4153-9b23-62900942cc75",
        "title": "Start dishwasher",
       "duration": 30},
       {"id": "11636abf-e200-440f-b5de-eb943be0eabf",
        "title": "Wipe counters",
       "duration": 60},
       {"id": "0d7c0a1d-e8c6-4302-976b-e0c562b05bb5",
       "title": "Sweep floor",
       "duration": 70}
      ]
    },
    {"id": "f91b8fa6-6987-43d7-a5ce-708509aff892",
      "name": "Evening Routine",
      "steps":[
      {"id": "ff9ab31d-f541-44d8-8e2b-7a894da0ca88",
        "title": "Brush teeth",
       "duration": 150},
       {"id": "9937c2ce-3ca2-4b7f-a155-347b7e9d773e",
        "title": "Change",
       "duration": 100},
       {"id": "ef989e33-dc01-4cf4-9f14-e765ff988b4a",
        "title": "Read until lights out",
       "duration": 1800}
      ]
    }
  ]
}

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
    await setRoutines(JSON.parse(routinesFromStorage).routines)
  }

  /**
   * Sets routines in local storage.
   * newRoutines will be converted to JSON string within this function.
   * It should be an array of routine objects
   * @param {[]} newRoutines
   */
  const setRoutinesInStorage = async (newRoutines) => {
    await setItem(JSON.stringify(newRoutines))
    await setRoutines(newRoutines)
  }

  /**
   * Adds a routine to the routines state and updates it in local storage.
   * routineToAdd should be a routine object
   * @param {{}}} routineToAdd 
   */
  const addRoutineInStorage = async (routineToAdd) => {
    await addRoutine(routineToAdd)
    await setRoutinesInStorage(routines)
  }

  /**
   * Removes a routine from state and storage
   * @param {String} routineName 
   */
  const removeRoutineFromStorage = async (routineName) => {
    await removeRoutine(routineName)
    await setRoutinesInStorage(routines)
  }

  useEffect(() => {
    // setRoutinesInStorage(dummyData)
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
