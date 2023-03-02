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

    const children = (remainingTime) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
      
        return `${minutes}:${seconds}`
    }

    return (
        <View>
            <Text>{title}</Text>
            <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={duration}
            children={children()}
            colors={['#51c251', '#bac24f', '#c93a42']}
            colorsTime={[duration, Math.floor(duration/2), 0]}
            key={timerKey}
            onUpdate={onUpdate}
            size={Dimensions.get("window").width * .8}
            strokeWidth={30}
            trailStrokeWidth={25}
            trailColor="#f1ffe7"
            >
                {({ remainingTime, color }) => {
                    const minutes = padNumber(Math.floor(remainingTime / 60))
                    const seconds = padNumber(remainingTime % 60)
                    return(
                    <Text style={{ color, fontSize: 40 }}>
                        {minutes}:{seconds}
                    </Text>
                    )
                }}
            </CountdownCircleTimer>
        </View>
    )
}