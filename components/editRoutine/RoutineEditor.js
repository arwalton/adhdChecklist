import { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View} from 'react-native';
import TitleText from '../common/TitleText';
import EditRoutineStep from './EditRoutineStep';
import { v4 as uuidv4 } from 'uuid';

export default RoutineEditor = ({routine}) => {

    const [titleText, setTitleText] = useState("New Routine")
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [titleStorage, setTitleStorage] = useState()
    const [selectedId, setSelectedId] = useState()
    const [steps, setSteps] = useState([
      {id: '1433d557-a71d-4363-8788-3e22dca4c889', title: "Example step1", duration: 30}, 
      {id: 'd34da1fe-2f73-468e-81a5-c047a2ece06a', title: "Example step2", duration: 30}])

    useEffect(() => {
      if(routine){
        setTitleText(routine.name)
        setSteps(routine.steps)
      }
      setTitleStorage(titleText)
    }, [])

    const createStep = () => {
      const uuid = uuidv4()
      return(
        {id: uuid, title: "New Step", duration: 60}
      )
    }

    /**
     * Add a step before the selected step
     */
    const addBefore = () => {
        const newStep = createStep()

      if(steps.length === 0){
        setSteps([newStep])
        return;
      }

      const selectedIndex = steps.findIndex((step)=> {
        return step.id === selectedId
      })

      if(selectedIndex === -1){
        setSteps([newStep, ...steps])
        return;
      }

      const arrayBefore = steps.slice(0,selectedIndex)
      const arrayAfter = steps.slice(selectedIndex)

      setSteps([...arrayBefore, newStep, ...arrayAfter])
      return;
    }

    /**
     * Add a step after the selected step
     */
    const addAfter = () => {
      const newStep = createStep()

    if(steps.length === 0){
      setSteps([newStep])
      return;
    }

    const selectedIndex = steps.findIndex((step)=> {
      return step.id === selectedId
    })

    if(selectedIndex === -1 || selectedIndex === steps.length -1){
      setSteps([...steps, newStep])
      return;
    }

    const arrayBefore = steps.slice(0,selectedIndex + 1)
    const arrayAfter = steps.slice(selectedIndex + 1)

    setSteps([...arrayBefore, newStep, ...arrayAfter])
    return;
    }

    /**
     * delete a step
     */
    const deleteStep = () => {
      const filteredArray = steps.filter((step) => {
        return step.id !== selectedId
      })

      setSteps(filteredArray)
    }

    const renderStep = ({item, index}) => {

      return (
        <EditRoutineStep
          step={item}
          key={"step" + index}
          selectedId={selectedId}
          onPress={() => {
            if(selectedId !== item.id){
              setSelectedId(item.id)
            }else{
              setSelectedId("")
            }
          }}
        />
      )
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onLongPress={()=>{
            setIsEditTitle(true)
          }}
        >
          
          <TitleText>{titleText}</TitleText>
        </TouchableOpacity>

        <FlatList
          style={styles.list}
          data={steps}
          extraData={steps.length}
          horizontal={true}
          renderItem={renderStep}
        />

        <View style={styles.controlButtons}>
          <TouchableOpacity
            onPress={() => addBefore()}
          >
            <Text>Add Before</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteStep()}
          >
            <Text>Delete Current</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => addAfter()}
          >
            <Text>Add After</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <View style={styles.centered}>
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
                if(titleText.length > 0){
                  setTitleStorage(titleText)
                }else{
                  setTitleText(titleStorage)
                }
                setIsEditTitle(false)
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setTitleText(titleStorage)
                setIsEditTitle(false)}
              }
            >
              <View style={styles.modalCancel}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
          </Modal>
        </View>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#f1ffe7',
    top: '35%',
    margin: 30,
    padding: 10,
  },
  modalCancel: {
    alignItems: "center",
    marginHorizontal: 80,
    marginTop: 8,
    marginBottom: 10,
    paddingVertical: 7,
    backgroundColor: "#6B9AC4"

  },
  modalCancelText: {
    fontWeight: "400"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    width: "100%",
    marginTop: 10,
  },
  controlButtons: {
    flex: .25,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    width: "100%"
  },
})