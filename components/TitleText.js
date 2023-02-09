/**
 * This component allows consistent styling for all titles in the app
 */
import { StyleSheet, Text } from 'react-native';

export default TitleText = (props) => {
    return(
        <Text style={styles.title}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontFamily: "Roboto",
        fontWeight: "800",
        color: "#f1ffe7",
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        width: "100%",
        borderBottomWidth: 4,
        borderColor: "#0D0221",
        textAlign: "center",
    }
})