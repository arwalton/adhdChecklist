import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default TouchableIcon = ({name, size, color, text, rotX, rotY, rotZ}) => {

    const rotationX = rotX ? rotX : "0deg";
    const rotationY = rotY ? rotY : "0deg";
    const rotationZ = rotZ ? rotZ : "0deg";

    return(
        <View style={styles.container}>
            <Ionicons 
                name={name} 
                size={size} 
                color={color} 
                style={{...styles.icon, transform: [{rotateX: rotationX}, {rotateY: rotationY}, {rotateZ: rotationZ}], height: size, width: size}}
            />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // borderColor: "blue",
        // borderWidth: 1,
        textAlign: "center",
    },
    text: {
        fontWeight: "500",
        color: "#dcdcdc",
        paddingTop: 0,
        marginTop: 0,
        // borderColor: "red",
        // borderWidth: 1,
    }
  })