# Tutorial: Todo List com React Native, Expo e Firebase

Este tutorial descreve o processo de criação de um aplicativo de Todo List usando React Native com Expo e Firebase para autenticação e armazenamento de dados.

## Configuração Inicial

1. Criar um novo projeto Expo:
```bash
npx create-expo-app@latest --template
# Escolher o template blank
Name: todo-list
cd todo-list
```

## Configuração do Firebase

1. Criar um novo projeto no [Console do Firebase](https://console.firebase.google.com)
2. Habilitar a Autenticação por Email/Senha:
   - No console do Firebase, vá para Authentication
   - Clique em "Get Started"
   - Em "Sign-in method", habilite "Email/Password"

3. Configurar o Firestore Database:
   - No console do Firebase, vá para Firestore Database
   - Clique em "Create Database"
   - Escolha "Start in production mode"
   - Selecione a região mais próxima

4. Configurar as regras do Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

5. Criar o índice necessário para consultas:
   - Vá para Firestore Database > Indexes
   - Adicione um índice composto:
     - Collection: notes
     - Fields: 
       - userId (Ascending)
       - createdAt (Descending)

## Instalação de Dependências

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install firebase
```

## Estrutura do Projeto

Criar a seguinte estrutura de diretórios:
```
src/
  ├── screens/
  │   ├── Home.js
  │   ├── SignIn.js
  │   ├── SignUp.js
  │   └── TodosList.js
  └── services/
      ├── firebase.js
      └── notes.js
```

## Configuração do Firebase

Em `src/services/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Suas configurações do Firebase aqui
  // Encontre em: Project Settings > General > Your apps > Web app
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## Funcionalidades Implementadas

1. **Autenticação**
   - Sign In com email e senha
   - Sign Up para novos usuários
   - Navegação protegida baseada no estado de autenticação

2. **Gerenciamento de Notas**
   - Criar novas notas com título e conteúdo
   - Listar todas as notas do usuário
   - Marcar notas como concluídas
   - Excluir notas
   - Ordenação por data de criação

## Principais Características

1. **Navegação**
   - Stack Navigation para gerenciar as telas
   - Navegação condicional baseada no estado de autenticação
   - Substituição de telas (replace) no fluxo de autenticação

2. **Segurança**
   - Autenticação de usuários
   - Regras do Firestore para proteger os dados
   - Validação de usuário autenticado em todas as operações

3. **Interface do Usuário**
   - Design moderno e limpo
   - Feedback visual para ações do usuário
   - Indicadores de carregamento
   - Tratamento de erros com alertas

## Dicas de Desenvolvimento

1. **Depuração**
   - Logs detalhados para operações do Firestore
   - Tratamento de erros consistente
   - Verificação de autenticação em todas as operações

2. **Boas Práticas**
   - Separação de responsabilidades (serviços, telas)
   - Validação de dados
   - Feedback ao usuário
   - Código organizado e comentado

## Próximos Passos Sugeridos

1. Implementar edição de notas
2. Adicionar categorias/tags para as notas
3. Implementar busca e filtros
4. Adicionar sincronização em tempo real com Firestore
5. Implementar temas claro/escuro
6. Adicionar testes automatizados
7. Implementar recuperação de senha
8. Adicionar autenticação social (Google, Apple) 
