// screens/List.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig'; // Import your firebaseConfig here
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const List = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [priority, setPriority] = useState('low');
  console.log("testing")

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIRESTORE_DB, 'todos'), (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    console.log("Hello")
    if (todo.trim() !== '') {
      try {
        const newTodoRef = await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo.trim(), done: false, priority });
        setTodo('');
      } catch (error) {
        console.error('Error adding todo: ', error);
      }
    }
  };

  const toggleTodo = async (id, done) => {
    const todoRef = doc(FIRESTORE_DB, `todos/${id}`);
    try {
      await updateDoc(todoRef, { done: !done });
    } catch (error) {
      console.error('Error toggling todo: ', error);
    }
  };

  const deleteTodo = async (id) => {
    const todoRef = doc(FIRESTORE_DB, `todos/${id}`);
    try {
      await deleteDoc(todoRef);
    } catch (error) {
      console.error('Error deleting todo: ', error);
    }
  };

  const renderTodo = ({ item }) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toggleTodo(item.id, item.done)} style={styles.todo}>
          {item.done ? (
            <Ionicons name='checkmark-circle' size={32} color="green" />
          ) : (
            <Entypo name="circle" size={32} color="black" />
          )}
          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Ionicons name="trash-bin-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          onChangeText={setTodo}
          value={todo}
        />
        <Picker
          selectedValue={priority}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setPriority(itemValue)}
        >
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>
      <Button onPress={addTodo} title="Add Todo" disabled={!todo.trim()} />

      <FlatList
       style= {{padding:16}}
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No todos found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  form: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
   todoText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default List;
