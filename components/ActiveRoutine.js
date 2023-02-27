import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  StyleSheet,
  View} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TitleText from './TitleText';

export default ActiveRoutine = ({route, navigation}) => {
    const {routineName, routineSteps} = route.params;
    const [step, setStep] = useState(0)

     return (
      <View style={styles.container}>
        <TitleText>{routineName}</TitleText>
        <CountdownCircleTimer
          isPlaying
          duration={7}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
          size={300}
          strokeWidth={30}
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
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