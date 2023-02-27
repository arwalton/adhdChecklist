import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

    const stepJsx = steps.map((step, index)=> {
        return <Text>{
            index + ": " + step.title + "\n" +
            "duration: " + step.duration
            }</Text>
    })

    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{name}</Text>
            </View>
            <View style={styles.viewButtonContainer}>

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
                    <Ionicons name="play" size={50} color="#BAFF29" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: 70,
        marginBottom: 5,
        paddingBottom: 5,
        borderBottomColor: "#0D0221",
        borderBottomWidth: 3,
    },
    nameContainer: {
        flex: 6,
        borderColor: '#0D0221',
        borderRightWidth: 2,
    },
    nameText: {
        fontFamily: "Roboto",
        fontWeight:"800",
        fontSize: 20,
        color: "#F1FFE7",
    },
    viewButtonContainer: {
        flex: 3,
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