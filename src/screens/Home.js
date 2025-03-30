import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/todo.avif')}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('TodosList')}
      >
        <Text style={styles.buttonText}>Ver Minhas Tarefas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 