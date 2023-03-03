import { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View} from 'react-native';
import TitleText from './TitleText';

export default RoutineEditor = ({routine}) => {

    const [titleText, setTitleText] = useState("New Routine")
    const [isEditTitle, setIsEditTitle] = useState(true)

    useEffect(() => {
      if(routine){
        setTitleText(routine.name)
      }
    }, [])

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onLongPress={()=>{
            setIsEditTitle(true)
          }}
        >
          
          <TitleText>{titleText}</TitleText>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditTitle}
          onRequestClose={() => {
          }}
        >
        <View style={styles.modal}>
          <TextInput
            style={styles.input}
            value={titleText}
            onChangeText={setTitleText}
            onSubmitEditing={() => {
              setIsEditTitle(false)
            }}
          />
        </View>
        </Modal>
        <Text>Routine Editor</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f4f4f',
    alignItems: 'center',
    paddingLeft: Dimensions.get("window").width * .025,
    paddingRight: Dimensions.get("window").width * .025,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})