import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoutinesPage from './components/RoutinesPage';
import RoutineEditor from './components/RoutineEditor';
import ActiveRoutine from './components/ActiveRoutine';

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="My Routines">
        <Stack.Screen name="My Routines" component={RoutinesPage} />
        <Stack.Screen name="Routine Editor" component={RoutineEditor} />
        <Stack.Screen name="Active Routine" component={ActiveRoutine} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}