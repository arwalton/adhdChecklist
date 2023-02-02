import { StatusBar } from 'expo-status-bar';
import { 
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View } from 'react-native';
import RoutineCard from './components/RoutineCard';
import SafeViewAndroid from './helpers/SafeViewAndroid';
import TitleText from './components/TitleText';

const dummyData = {
  "routines": [
    {"name": "Morning Routine",
      "steps":[
        {"title": "Make bed",
         "duration": 300},
         {"title": "Shower and change",
         "duration": 600},
         {"title": "Eat breakfast",
         "duration": 700}
      ]
    },
    {"name": "Clean the kitchen",
      "steps":[
      {"title": "Start dishwasher",
       "duration": 300},
       {"title": "Wipe counters",
       "duration": 600},
       {"title": "Sweep floor",
       "duration": 700}
      ]
    },
    {"name": "Evening Routine",
      "steps":[
      {"title": "Brush teeth",
       "duration": 150},
       {"title": "Change",
       "duration": 100},
       {"title": "Read until lights out",
       "duration": 1800}
      ]
    }
  ]
}

export default function App() {

  return (
    <SafeAreaView style={SafeViewAndroid.DroidSafeArea}>
      <View style={styles.container}>
        <TitleText>Your Routines</TitleText>
        <FlatList
          data={dummyData.routines}
          renderItem={(routine, index) => (
            <RoutineCard
              routine={routine.item}
              key={"routine" + index}
            />
          )}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
