import {
  Dimensions,
  Text,
  StyleSheet,
  View} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';


export default ActiveRoutineStep = ({
    step, 
    isPlaying, 
    timerKey, 
    navigateRoutine, 
    remainingSteps
}) => {
    const title = step.title;
    const duration = step.duration;
    const [endSound, setEndSound] = useState()
    const [displayFinalMessage, setDisplayFinalMessage] = useState(false)

    const playEndSound = async () => {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/harp.mp3'));
        setEndSound(sound)

        await sound.playAsync()
    }

    useEffect(() => {
        return endSound
          ? () => {
              endSound.unloadAsync();
            }
          : undefined;
      }, [endSound]);

    /**
     * This function takes a number and adds a leading 0 if it is less than
     * 2 characters long.
     * @param {} num - Number
     * @returns string 
     */
    const padNumber = (num) => {
        const numToPad = num.toString();
        if(numToPad.length === 0){
          return "00"
        }
        if(numToPad.length === 1){
          return "0" + numToPad
        }
        return numToPad;
      }

    /**
     * The onUpdate function is used to play sounds as the timer counts down
     * @param {*} remainingTime 
     */
    const onUpdate = (remainingTime) => {
        if(displayFinalMessage){
            setDisplayFinalMessage(false)
        }
        if(remainingTime === Math.floor(duration/2)){
            console.log("halfway!")
        }

        if(remainingTime === 3){
            playEndSound()
        }

    }

    const onComplete = (totalElapsedTime) => {
        if(remainingSteps > 0){
            navigateRoutine(true)
        }else{
            setDisplayFinalMessage(true)
        }
    }

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={duration}
            colors={['#51c251', '#bac24f', '#c93a42']}
            colorsTime={[duration, Math.floor(duration/2), 0]}
            key={timerKey}
            onComplete={onComplete}
            onUpdate={onUpdate}
            size={Dimensions.get("window").width * .8}
            strokeWidth={20}
            trailStrokeWidth={18}
            trailColor="#f1ffe7"
            >
                {({ remainingTime, color }) => {
                    const minutes = padNumber(Math.floor(remainingTime / 60))
                    const seconds = padNumber(remainingTime % 60)
                    if(displayFinalMessage){ 
                        return <Text style={{...styles.childText, color: '#f1ffe7'}}>"You're all done!</Text>
                    }
                    return(
                        <>
                            <Text style={{...styles.childText, color}}>
                                {title}
                            </Text>
                            <Text style={{ fontSize: 40, color }}>
                                {minutes}:{seconds}
                            </Text>
                        </>
                    )
                        
                }}
            </CountdownCircleTimer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    childText: {
        display: "flex",
        fontSize: 30,
        fontWeight: "500",
        width: "80%",
        textAlign: "center",
    }
})