import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  StyleSheet,
  View} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TitleText from './TitleText';

export default ActiveRoutineStep = ({step, isPlaying, timerKey}) => {
    const title = step.title;
    const duration = step.duration;

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

    const onUpdate = (remainingTime) => {
        if(remainingTime === Math.floor(duration/2)){
            console.log("halfway!")
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
            onUpdate={onUpdate}
            size={Dimensions.get("window").width * .8}
            strokeWidth={20}
            trailStrokeWidth={23}
            trailColor="#f1ffe7"
            >
                {({ remainingTime, color }) => {
                    const minutes = padNumber(Math.floor(remainingTime / 60))
                    const seconds = padNumber(remainingTime % 60)
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
        width: "80%",
        textAlign: "center",
    }
})