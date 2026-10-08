import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';

export default function CoursesScreen() {
  const courses = [
    { id: '1', title: 'Foundations', description: 'Beginner English Basics', progress: 45 },
    { id: '2', title: 'A1 - Basic English', description: 'Functional communication', progress: 0 },
    { id: '3', title: 'A2 - Functional', description: 'Daily and work situations', progress: 0 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.courseCard}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text style={styles.courseDescription}>{item.description}</Text>
              </View>
              <View style={styles.courseProgress}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{item.progress}%</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  courseInfo: {
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
  },
  courseProgress: {
    alignItems: 'flex-end',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
});
