import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@store/authStore';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#007AFF" />
          </View>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.userId}>ID: {user?.id}</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Professional Profile</Text>
          <ProfileInfoItem label="Professional Area" value="Backend Developer" />
          <ProfileInfoItem label="Current Level" value="A1" />
          <ProfileInfoItem label="Learning Goal" value="Remote Work" />
          <ProfileInfoItem label="Daily Study" value="30 minutes" />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="settings" size={20} color="#007AFF" />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="help-circle" size={20} color="#007AFF" />
            <Text style={styles.buttonText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="information-circle" size={20} color="#007AFF" />
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#FF3B30" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ProfileInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f3ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userId: {
    fontSize: 12,
    color: '#999',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonsContainer: {
    gap: 12,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutButtonText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '600',
  },
});
