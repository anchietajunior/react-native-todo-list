import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

// Função para obter todas as notas do usuário
export const getNotes = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error('Usuário não está autenticado');
      throw new Error('Usuário não está autenticado');
    }

    console.log('Buscando notas para o usuário:', userId);
    const notesRef = collection(db, 'notes');
    const q = query(
      notesRef,
      where('userId', '==', userId)
      // Temporariamente removendo a ordenação até o índice ser criado
      // orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const notes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Ordenando as notas em memória enquanto o índice não está pronto
    notes.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toMillis() - a.createdAt.toMillis();
    });
    console.log('Notas encontradas:', notes);
    return notes;
  } catch (error) {
    console.error('Erro detalhado ao buscar notas:', error);
    throw error;
  }
};

// Função para criar uma nova nota
export const createNote = async (title, content) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error('Usuário não está autenticado');
      throw new Error('Usuário não está autenticado');
    }

    console.log('Criando nota para o usuário:', userId);
    const note = {
      title,
      content,
      userId,
      createdAt: serverTimestamp(),
      completed: false
    };

    const docRef = await addDoc(collection(db, 'notes'), note);
    const newNote = {
      id: docRef.id,
      ...note
    };
    console.log('Nota criada com sucesso:', newNote);
    return newNote;
  } catch (error) {
    console.error('Erro detalhado ao criar nota:', error);
    throw error;
  }
};

// Função para atualizar uma nota
export const updateNote = async (noteId, updates) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error('Usuário não está autenticado');
      throw new Error('Usuário não está autenticado');
    }

    console.log('Atualizando nota:', noteId, 'para o usuário:', userId);
    const noteRef = doc(db, 'notes', noteId);
    await updateDoc(noteRef, updates);
    console.log('Nota atualizada com sucesso');
  } catch (error) {
    console.error('Erro detalhado ao atualizar nota:', error);
    throw error;
  }
};

// Função para deletar uma nota
export const deleteNote = async (noteId) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error('Usuário não está autenticado');
      throw new Error('Usuário não está autenticado');
    }

    console.log('Deletando nota:', noteId, 'do usuário:', userId);
    const noteRef = doc(db, 'notes', noteId);
    await deleteDoc(noteRef);
    console.log('Nota deletada com sucesso');
  } catch (error) {
    console.error('Erro detalhado ao deletar nota:', error);
    throw error;
  }
}; 