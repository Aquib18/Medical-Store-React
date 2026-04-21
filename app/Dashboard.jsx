
import React from 'react';
import { useRouter } from 'expo-router';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Dashboard() {
    const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome 👋</Text>
        <Text style={styles.title}>Medical Billing Dashboard</Text>
      </View>

      {/* Sales Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.card}>
          <Text style={styles.cardValue}>₹18,450</Text>
          <Text style={styles.cardLabel}>Today Sales</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardValue}>32</Text>
          <Text style={styles.cardLabel}>Bills Created</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.card}>
          <Text style={styles.cardValue}>148</Text>
          <Text style={styles.cardLabel}>Medicines</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardValue}>9</Text>
          <Text style={styles.cardLabel}>Low Stock</Text>
        </View>
      </View>

      {/* Alert Section */}
      <Text style={styles.sectionTitle}>Alerts</Text>

      <View style={styles.alertBox}>
        <Text style={styles.alertText}>⚠ 5 Medicines Expiring This Month</Text>
      </View>

      <View style={styles.alertBox}>
        <Text style={styles.alertText}>📦 9 Items Low in Stock</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <TouchableOpacity style={styles.actionBtn}   onPress={() => router.push('/Clientdashboard')}>
       
        <Text style={styles.actionText}>➕ Create New Bill</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionText}>💊 Add Medicine</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionText}>📄 View Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionText}>📦 Manage Stock</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8fb',
    padding: 20,
  },

  header: {
    marginTop: 20,
    marginBottom: 25,
  },

  greeting: {
    fontSize: 18,
    color: '#666',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86DE',
    marginTop: 5,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    elevation: 3,
  },

  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E86DE',
  },

  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#222',
  },

  alertBox: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  alertText: {
    color: '#856404',
    fontSize: 15,
    fontWeight: '600',
  },

  actionBtn: {
    backgroundColor: '#2E86DE',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
