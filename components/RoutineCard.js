import { Dimensions, StyleSheet, Text, View } from 'react-native';

/**
 * props:
 * routine = {"name": "foo",
 *      "steps":[
 *         {"title": "bar",
 *          "duration": 300},
 *          {"title": "baz",
 *          "duration": 600}
 *       ]
 *     }
*/
export default RoutineCard = (props) => {
    const name = props.routine.name
    const steps = props.routine.steps

    const stepJsx = steps.map((step, index)=> {
        return <Text>{
            index + ": " + step.title + "\n" +
            "duration: " + step.duration
            }</Text>
    })

    return (
        <View style={styles.container}>
            <View style={styles.name}>
                <Text style={styles.nameText}>{name}</Text>
            </View>
            <View style={styles.viewButton}>

            </View>
            
            <View style={styles.start}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        width: Dimensions.get("window").width * .95,
        height: 70
    },
    name: {
        flex: 6,
        borderColor: 'blue',
        borderWidth: 2,
    },
    nameText: {
        fontFamily: "Roboto",
        fontWeight:"800",
    },
    viewButton: {
        flex: 3,
        borderColor: 'green',
        borderWidth: 2,
    },
    start: {
        flex: 3,
        borderColor: 'yellow',
        borderWidth: 2,
    }
})