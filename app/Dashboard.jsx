
import React, { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebaseConfig";

export default function Dashboard() {
  const router = useRouter();

  const [totalMedicines, setTotalMedicines] =
    useState(0);

  const [lowStockCount, setLowStockCount] =
    useState(0);

  const [expiryCount, setExpiryCount] =
    useState(0);

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [])
  );

  const loadDashboardData = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "medicines")
      );

      let total = snapshot.size;
      let lowStock = 0;
      let expirySoon = 0;

      const today = new Date();

      snapshot.forEach((doc) => {
        const data = doc.data();

        // LOW STOCK
        const qty = Number(
          data.totalQuantity || 0
        );

        const min = Number(
          data.minimumStock || 0
        );

        if (qty <= min) {
          lowStock++;
        }

        // EXPIRY SOON
        if (data.expirydate) {
          const parts =
            data.expirydate.split("-");

          const expDate = new Date(
            parts[2],
            parts[1] - 1,
            parts[0]
          );

          const diff = Math.ceil(
            (expDate - today) /
            (1000 * 60 * 60 * 24)
          );

          if (diff >= 0 && diff <= 60) {
            expirySoon++;
          }
        }
      });

      setTotalMedicines(total);
      setLowStockCount(lowStock);
      setExpiryCount(expirySoon);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#f4f8fb"
        barStyle="dark-content"
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Welcome 👋
          </Text>

          <Text style={styles.title}>
            Anam Medico
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push("/MedicineList")
            }
          >
            <Text style={styles.cardValue}>
              {totalMedicines}
            </Text>

            <Text style={styles.cardLabel}>
              Medicines
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push("/Lowstock")
            }
          >
            <Text style={styles.cardValue}>
              {lowStockCount}
            </Text>

            <Text style={styles.cardLabel}>
              Low Stock
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alerts */}
        <Text style={styles.sectionTitle}>
          Alerts
        </Text>

        <TouchableOpacity
          style={styles.alertBox}
          onPress={() =>
            router.push("/ExpiryAlert")
          }
        >
          <Text style={styles.alertText}>
            ⚠ {expiryCount} Medicines
            Expiring Soon
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.alertBox}
          onPress={() =>
            router.push("/Lowstock")
          }
        >
          <Text style={styles.alertText}>
            📦 {lowStockCount} Items Low
            in Stock
          </Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            router.push(
              "/Clientdashboard"
            )
          }
        >
          <Text style={styles.actionText}>
            ➕ Create New Bill
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            router.push(
              "/Addmedicine"
            )
          }
        >
          <Text style={styles.actionText}>
            💊 Add Medicine
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
        >
          <Text style={styles.actionText}>
            📄 View Reports
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            router.push(
              "/MedicineList"
            )
          }
        >
          <Text style={styles.actionText}>
            📦 Manage Stock
          </Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f8fb",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    marginTop: 10,
    marginBottom: 25,
  },

  greeting: {
    fontSize: 18,
    color: "#666",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E86DE",
    marginTop: 5,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginBottom: 15,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    elevation: 3,
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E86DE",
  },

  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
    color: "#222",
  },

  alertBox: {
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  alertText: {
    color: "#856404",
    fontSize: 15,
    fontWeight: "600",
  },

  actionBtn: {
    backgroundColor: "#2E86DE",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  actionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});