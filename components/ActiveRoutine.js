import { useEffect } from 'react';
import {Text, View} from 'react-native';

export default ActiveRoutine = ({route, navigation}) => {
    const {routineName} = route.params;

    useEffect(()=>{
        console.log(routineName)
    },[])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ActiveRoutine is {routineName}</Text>
      </View>
    );
}