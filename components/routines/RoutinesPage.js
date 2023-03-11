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
import { useEffect, useState } from 'react';
import useRoutineStore from '../../store/routineStore';
import{ getRoutinesFromStorage } from '../../api/localStorageApi';
import { setRoutinesInStorage } from '../../api/localStorageApi';

const iconWidth = 70;

export default RoutinesPage = ({navigation})=>{

  const routines = useRoutineStore((state) => state.routines)
  const setRoutines = useRoutineStore((state) => state.setRoutines)
  const addRoutine = useRoutineStore((state) => state.addRoutine)
  const removeRoutine = useRoutineStore((state) => state.removeRoutine)

  

  useEffect(() => {
    const fetchRoutines = async () => {
      const data = await getRoutinesFromStorage()
      if(data){
        setRoutines(data)
      }
    }
    fetchRoutines()
    .catch(console.error)
  },[])

  useEffect(() => {
    setRoutinesInStorage(routines)
  },[routines])

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
            onPress={()=>{navigation.navigate("Routine Editor", {routine: null})}}
          >
            <Ionicons name="add" size={iconWidth} color='#51c251' />
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
