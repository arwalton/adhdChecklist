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
    }
})