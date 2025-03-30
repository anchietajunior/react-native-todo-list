import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockTodos = [
  { id: '1', title: 'Estudar React Native' },
  { id: '2', title: 'Fazer exercícios' },
  { id: '3', title: 'Ler um livro' },
];

export default function TodosList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      <FlatList
        data={mockTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 16,
  },
}); 