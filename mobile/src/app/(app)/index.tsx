import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* XP and Streak Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>🔥 Streak</Text>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statSubtitle}>days</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>⭐ XP</Text>
              <Text style={styles.statValue}>1,420</Text>
              <Text style={styles.statSubtitle}>points</Text>
            </View>
          </View>
        </View>

        {/* Weekly Goal Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Goal</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '82%' }]} />
          </View>
          <Text style={styles.progressText}>82% Complete (210 min / 256 min)</Text>
        </View>

        {/* Skills Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Skills</Text>
          <View style={styles.skillsGrid}>
            <SkillItem label="Grammar" value={84} />
            <SkillItem label="Vocabulary" value={76} />
            <SkillItem label="Listening" value={70} />
            <SkillItem label="Speaking" value={68} />
            <SkillItem label="Writing" value={87} />
            <SkillItem label="Technical" value={91} />
          </View>
        </View>

        {/* Call to Action */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continue Learning</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function SkillItem({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.skillItem}>
      <Text style={styles.skillLabel}>{label}</Text>
      <View style={styles.skillBar}>
        <View style={[styles.skillFill, { width: `${value}%` }]} />
      </View>
      <Text style={styles.skillValue}>{value}%</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  skillsGrid: {
    gap: 12,
  },
  skillItem: {
    marginBottom: 12,
  },
  skillLabel: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    marginBottom: 4,
  },
  skillBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  skillFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  skillValue: {
    fontSize: 11,
    color: '#999',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
