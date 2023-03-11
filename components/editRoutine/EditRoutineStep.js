import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default EditRoutineStep = ({
    step,
    onPress,
    selectedId
}) => {
    
    const backgroundColor = step.id === selectedId ? "#F9A03F" : "#6B9AC4"


    useEffect(()=> {
    },[])

    return(
        <TouchableOpacity
        style={{...styles.container, backgroundColor}}
            onPress={onPress}
        
        >
          <Text>{step.title}</Text>
          <Text>{step.duration}</Text>
        </TouchableOpacity>
      )
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        padding: 10,
        marginRight: 10,
        backgroundColor: ""
    }
})