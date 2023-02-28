import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TitleText from './TitleText';
import ActiveRoutineStep from './ActiveRoutineStep';

export default ActiveRoutine = ({route, navigation}) => {
  const {routineName, routineSteps} = route.params;
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <View style={styles.container}>
      <TitleText>{routineName}</TitleText>
      <ActiveRoutineStep step={routineSteps[step]} isPlaying={isPlaying}></ActiveRoutineStep>
      <View>
        <TouchableOpacity
          onPress={()=>{
            setIsPlaying(!isPlaying)
          }}
        >
          <Text style={{fontSize: 20}}>{isPlaying ? "Pause" : "Play" }</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            console.log("Stop button pushed")
          }}
        >
          <Text style={{fontSize: 20}}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            console.log("Reset button pushed")
          }}>
          <Text style={{fontSize: 20}}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          disabled={!Boolean(step)}
          onPress={()=>{
            setStep(step - 1)
          }}
        >
          <Text style={{fontSize: 20}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={step === routineSteps.length - 1}
          onPress={()=>{
            setStep(step + 1)
          }}
        >
          <Text style={{fontSize: 20}}>Forward</Text>
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
})