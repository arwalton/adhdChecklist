import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TitleText from './TitleText';
import ActiveRoutineStep from './ActiveRoutineStep';
import TouchableIcon from './TouchableIcon';

export default ActiveRoutine = ({route, navigation}) => {
  const {routineName, routineSteps} = route.params;
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [timerKey, setTimerKey] = useState(0)

  const navigateRoutine = (shouldMoveForward) => {
    if(shouldMoveForward && step !== routineSteps.length - 1){
      setStep(step + 1)
    }else if(!shouldMoveForward && step !== 0){
      setStep(step - 1)
    }
    setTimerKey(timerKey + 1)
  }

  return (
    <View style={styles.container}>
      <TitleText>{routineName}</TitleText>
      <ActiveRoutineStep
        step={routineSteps[step]}
        isPlaying={isPlaying}
        timerKey={timerKey}
        navigateRoutine={navigateRoutine}
        remainingSteps={routineSteps.length -1 - step}
      >
      </ActiveRoutineStep>
      <View style={styles.controlButtons}>
        {/* Pause/Play button */}
        <TouchableOpacity
          onPress={()=>{
            setIsPlaying(!isPlaying)
          }}
        >
          {isPlaying ?
          <TouchableIcon
            name="pause"
            size={50}
            color="#6B9AC4"
            text="Pause"
          >
          </TouchableIcon>
          :
          <TouchableIcon
            name="play"
            size={50}
            color="#BAFF29"
            text="Play"
          >  
          </TouchableIcon>
          }
        </TouchableOpacity>
        {/* Stop Button */}
        <TouchableOpacity
          onPress={()=>{
            setIsPlaying(false)
            setTimerKey(timerKey + 1)
          }}
        >
          <TouchableIcon
            name="stop"
            size={50}
            color="#E63946"
            text="Stop"
          > 
          </TouchableIcon>
        </TouchableOpacity>
        {/* Reset button */}
        <TouchableOpacity
          onPress={()=>{
            setTimerKey(timerKey + 1)
          }}>
          <TouchableIcon
            name="reload"
            size={50}
            color="#F9A03F"
            text="Reset"
            rotY="180deg"
            rotZ="90deg"
          >  
          </TouchableIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.controlButtons}>
        {/* Back button */}
        <TouchableOpacity
          disabled={!Boolean(step)}
          onPress={() => navigateRoutine(false)}
          style={!Boolean(step) ? styles.disabled : {}}
        >
          <TouchableIcon
            name="play-skip-back"
            size={50}
            color="#f1ffe7"
            text="Back"
          > 
          </TouchableIcon>
        </TouchableOpacity>
        {/* Forward button */}
        <TouchableOpacity
          disabled={step === routineSteps.length - 1}
          onPress={() => navigateRoutine(true)}
          style={step === routineSteps.length -1 ? styles.disabled : {}}
        >
          <TouchableIcon
            name="play-skip-forward"
            size={50}
            color={"#f1ffe7"}
            text="Forward"
          > 
          </TouchableIcon>
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
  controlButtons: {
    flex: .25,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    width: "100%"
  },
  disabled: {
    opacity: .2
  }
})