import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {Picker} from '@react-native-picker/picker';

export default EditRoutineStep = ({
    step,
    onPress,
    selectedId,
    updateStep,
}) => {

    const [title, setTitle] = useState(step.title)
    const [duration, setDuration] = useState(step.duration)
    const [tmpTime, setTmpTime] = useState(new Date(step.duration * 1000))
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()
    const isActive = step.id === selectedId

    
    const width = isActive ? 275 : 250
    const border = isActive ? {borderWidth: 3, borderColor: "#F9A03F"} : {}


    useEffect(()=> {
        const newDuration = (Number(minutes) * 60) + Number(seconds)
        updateStep(title, newDuration)
    },[title, minutes, seconds])

    const pickerMinutes = [...Array(100).keys()].map((step, index) => {
        return (
            <Picker.Item label={index.toString()} value={index.toString()} key={"minute" + index}/>
        )
    })

    const pickerSeconds = [...Array(60).keys()].map((step, index) => {
        return (
            <Picker.Item label={index.toString()} value={index.toString()} key={"second" + index}/>
        )
    })

    return(
        <TouchableOpacity
            style={{...styles.container, width, ...border}}
            onPress={onPress}
        >
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Title:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                        editable={isActive}
                        selectTextOnFocus={true}
                    />
                </View>
                <View 
                    style={styles.inputContainer}
                    pointerEvents={isActive ? "auto" : "none"}    
                >
                    <Text style={styles.inputText}>Minutes:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={minutes}
                        onValueChange={(itemValue, itemIndex) =>
                            setMinutes(itemValue)
                        }
                    >
                        {pickerMinutes}
                    </Picker>
                    <Text style={styles.inputText}>Seconds:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={seconds}   
                        onValueChange={(itemValue, itemIndex) =>
                            setSeconds(itemValue)
                        } 
                    >
                        {pickerSeconds}
                    </Picker>
                </View>

                
                
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginRight: 10,
        backgroundColor: "#6B9AC4"
    },
    formContainer: {
        flex: 1,
        alignItems: "center",
    },
    inputContainer: {
        width: "100%",
    },
    inputText: {
        marginLeft: 12,
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: '#f1ffe7',
    },
})