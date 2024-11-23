import React, { useState } from 'react';
import { StyleSheet, FlatList, TextInput, Button, View, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contest/auth';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<{ id: string; text: string }[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const { signOut } = useAuth();
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now().toString(), text: taskInput },
      ]);
      setTaskInput('');
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const renderTask = ({ item }: { item: { id: string; text: string } }) => (
    <ThemedView style={styles.taskItem}>
      <ThemedText style={styles.taskText}>{item.text}</ThemedText>
      <Button title="Delete" onPress={() => deleteTask(item.id)} color="#f00" />
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        ToDo App
      </ThemedText>
      <Button title="Logout" onPress={signOut} />
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <Button title="Add" onPress={addTask} />
      </ThemedView>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    marginBottom: 16,
    fontSize: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  taskList: {
    flexGrow: 1,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  taskText: {
    fontSize: 16,
  },
});
