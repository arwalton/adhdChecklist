import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import useRoutineStore from '../../store/routineStore';
import { v4 as uuidv4 } from 'uuid';
import TouchableIcon from '../common/TouchableIcon';

/**
 * props:
 * routine = {"name": "foo",
 *      "steps":[
 *         {"title": "bar",
 *          "duration": 300}
 *       ]
 *     }
*/
export default RoutineCard = ({routine}) => {
    const navigation = useNavigation();
    const name = routine.name
    const steps = routine.steps
    const id = routine.id

    const addRoutine = useRoutineStore((state) => state.addRoutine)
    const removeRoutine = useRoutineStore((state) => state.removeRoutine)

    const stepJsx = steps.map((step, index)=> {
        return <Text>{
            index + ": " + step.title + "\n" +
            "duration: " + step.duration
            }</Text>
    })

    const handleEdit = () => {
        navigation.navigate("Routine Editor", {routine: routine})
    }

    const handleDuplicate = () => {
        console.log("duplicate Pressed")
        const stepsWithNewId = steps.map((step) => {
            return {...step, id:uuidv4()}
        })
        const dupeRoutine = {
            id: uuidv4(),
            name: "Copy of " + name,
            steps: stepsWithNewId
        }
        addRoutine(dupeRoutine)
    }

    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <ScrollView horizontal>
                    <Text 
                        style={styles.nCNameText}
                        numberOfLines={1}    
                    >
                        {name}
                </Text>
                </ScrollView>
                <View style={styles.nCButtonContainer}>
                    <TouchableOpacity
                        style={styles.nCButtonContainerButton}
                        onPress={handleEdit}
                    >
                        <View style={{...styles.centered, backgroundColor: "#F9A03F"}}>
                            <Text>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.nCButtonContainerButton}
                        onPress={handleDuplicate}
                    >
                        <View style={{...styles.centered, backgroundColor: "#6B9AC4"}}>
                            <Text>Duplicate</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.deleteButtonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        removeRoutine(id)
                    }}
                >
                    <TouchableIcon
                        name="trash"
                        size={40}
                        color="#E63946"
                        text="Delete"
                    /> 
                </TouchableOpacity>
            
            </View>
            
            <View style={styles.startContainer}>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("Active Routine",{
                            routineName: name,
                            routineSteps: steps
                        });
                    }}
                >
                    <TouchableIcon
                        name="play"
                        size={40}
                        color="#51c251"
                        text="Play"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: 90,
        marginBottom: 5,
        paddingBottom: 5,
        borderBottomColor: "#0D0221",
        borderBottomWidth: 3,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameContainer: {
        flex: 6,
        borderColor: '#0D0221',
        borderRightWidth: 2,
    },
    nCNameText: {
        fontFamily: "Roboto",
        fontWeight:"800",
        fontSize: 20,
        color: "#F1FFE7",
        overflow: "scroll",
        paddingRight: 15
    },
    nCButtonContainer: {
        flex: 6,
        flexDirection: "row",
        paddingRight: 5,
    },
    nCButtonContainerButton: {
        flex: 1,
        marginRight: 5,
        marginTop: 5,
    },
    deleteButtonContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 2,
        borderRightColor: "#0D0221",
    },
    startContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    playButton: {
        fontSize: 40,
    }
})