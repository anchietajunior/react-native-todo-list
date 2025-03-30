import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import TodosList from './src/screens/TodosList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Início' }}
        />
        <Stack.Screen 
          name="TodosList" 
          component={TodosList} 
          options={{ title: 'Minhas Tarefas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
