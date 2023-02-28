import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  StyleSheet,
  View} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TitleText from './TitleText';
import ActiveRoutineStep from './ActiveRoutineStep';

export default ActiveRoutine = ({route, navigation}) => {
  const {routineName, routineSteps} = route.params;
  const [step, setStep] = useState(0)

  return (
    <View style={styles.container}>
      <TitleText>{routineName}</TitleText>
      <ActiveRoutineStep step={routineSteps[0]} ></ActiveRoutineStep>
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