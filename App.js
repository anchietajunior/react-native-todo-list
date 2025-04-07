import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebase';
import Home from './src/screens/Home';
import TodosList from './src/screens/TodosList';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null; // Ou um componente de loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Rotas autenticadas
          <>
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
          </>
        ) : (
          // Rotas de autenticação
          <>
            <Stack.Screen 
              name="SignIn" 
              component={SignIn} 
              options={{ title: 'Entrar' }}
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUp} 
              options={{ title: 'Cadastrar' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
