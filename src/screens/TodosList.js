import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { getNotes, createNote, updateNote, deleteNote } from '../services/notes';

export default function TodosList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const notesData = await getNotes();
      setNotes(notesData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as notas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (!newNoteTitle.trim()) {
      Alert.alert('Erro', 'O título é obrigatório');
      return;
    }

    try {
      await createNote(newNoteTitle, newNoteContent);
      setNewNoteTitle('');
      setNewNoteContent('');
      loadNotes();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a nota');
    }
  };

  const handleToggleComplete = async (noteId, completed) => {
    try {
      await updateNote(noteId, { completed: !completed });
      loadNotes();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a nota');
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      loadNotes();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a nota');
    }
  };

  const renderNote = ({ item }) => (
    <View style={[styles.noteItem, item.completed && styles.completedNote]}>
      <TouchableOpacity 
        style={styles.noteContent}
        onPress={() => handleToggleComplete(item.id, item.completed)}
      >
        <Text style={[styles.noteTitle, item.completed && styles.completedText]}>
          {item.title}
        </Text>
        {item.content && (
          <Text style={[styles.noteText, item.completed && styles.completedText]}>
            {item.content}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDeleteNote(item.id)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título da nota"
          value={newNoteTitle}
          onChangeText={setNewNoteTitle}
        />
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Conteúdo (opcional)"
          value={newNoteContent}
          onChangeText={setNewNoteContent}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleCreateNote}>
          <Text style={styles.addButtonText}>Adicionar Nota</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        style={styles.list}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  noteItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedNote: {
    backgroundColor: '#e8e8e8',
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
}); 