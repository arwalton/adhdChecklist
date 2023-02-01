import { ProgressViewIOSComponent, StyleSheet, Text, View } from 'react-native';

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
    console.log("props", props)
    console.log("props.routine", props.routine)
    return (
        <View style={styles.container}>
            <Text>{props.routine.item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: .3,
        borderColor: 'red',
        borderWidth: 1,
        justifyContent: 'space-between'

    }
})