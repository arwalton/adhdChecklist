import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  StyleSheet,
  View} from 'react-native';
import TitleText from './TitleText';

export default ActiveRoutine = ({route, navigation}) => {
    const {routineName} = route.params;
    const [step, setStep] = useState(0)

    return (
      <View style={styles.container}>
        <TitleText>{routineName}</TitleText>

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