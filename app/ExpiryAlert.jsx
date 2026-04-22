import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function ExpiryAlerts() {
  const router = useRouter();

  const medicines = [
    {
      name: "Amoxicillin 500mg",
      batch: "#AMX-9021",
      expiry: "Oct 24, 2023",
      stock: 42,
      level: "CRITICAL",
      color: "#D11A1A",
      bg: "#FDEAEA",
      icon: "close-circle",
    },
    {
      name: "Lisinopril 10mg",
      batch: "#LIS-4432",
      expiry: "Nov 12, 2023",
      stock: 115,
      level: "HIGH RISK",
      color: "#A84300",
      bg: "#FFF1E8",
      icon: "warning",
    },
    {
      name: "Metformin 850mg",
      batch: "#MET-1108",
      expiry: "Dec 05, 2023",
      stock: 89,
      level: "MONITORED",
      color: "#004AC6",
      bg: "#E8F0FF",
      icon: "time",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F7F9FB" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={24} color="#004AC6" />
            </View>
            <Text style={styles.brand}>Clinical Atelier</Text>
          </View>

          <TouchableOpacity>
            <MaterialIcons name="search" size={28} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Top Title */}
        <Text style={styles.smallTitle}>STOCK INTEGRITY</Text>
        <Text style={styles.pageTitle}>Expiry Alerts</Text>

        {/* Main Alert Card */}
        <View style={styles.bigCard}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.redSmall}>7 DAYS</Text>
              <Text style={styles.bigNumber}>12</Text>
            </View>

            <View style={styles.alertCircle}>
              <MaterialIcons name="priority-high" size={34} color="#D11A1A" />
            </View>
          </View>

          <Text style={styles.desc}>
            Critical expirations requiring immediate removal.
          </Text>

          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>
        </View>

        {/* Mini Cards */}
        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.orangeText}>30 DAYS</Text>
            <Text style={styles.smallNumber}>28</Text>
            <Text style={styles.grayText}>High Risk</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.blueText}>60 DAYS</Text>
            <Text style={styles.smallNumber}>45</Text>
            <Text style={styles.grayText}>Monitored</Text>
          </View>
        </View>

        {/* Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Priority Removal</Text>
          <MaterialIcons name="filter-list" size={28} color="#64748B" />
        </View>

        {/* Medicine Cards */}
        {medicines.map((item, index) => (
          <View key={index} style={styles.medicineCard}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.medName}>{item.name}</Text>
                <Text style={styles.batch}>Batch: {item.batch}</Text>
              </View>

              <View
                style={[
                  styles.badge,
                  { backgroundColor: item.bg },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: item.color },
                  ]}
                >
                  {item.level}
                </Text>
              </View>
            </View>

            <View style={[styles.rowBetween, { marginTop: 22 }]}>
              <View style={styles.inline}>
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={item.color}
                />
                <Text
                  style={[
                    styles.expiryText,
                    { color: item.color },
                  ]}
                >
                  {" "}Expires: {item.expiry}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.stockLabel}>STOCK</Text>
                <Text style={styles.stockValue}>
                  {item.stock} Units
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons
            name="dashboard"
            size={24}
            color="#94A3B8"
          />
          <Text style={styles.navText}>DASHBOARD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons
            name="inventory-2"
            size={24}
            color="#94A3B8"
          />
          <Text style={styles.navText}>INVENTORY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.activeNav}>
          <MaterialIcons
            name="notifications"
            size={24}
            color="#fff"
          />
          <Text style={styles.activeText}>ALERTS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons
            name="bar-chart"
            size={24}
            color="#94A3B8"
          />
          <Text style={styles.navText}>REPORTS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DCEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  brand: {
    fontSize: 18,
    fontWeight: "800",
    color: "#004AC6",
  },

  smallTitle: {
    fontSize: 12,
    letterSpacing: 3,
    color: "#6B7280",
    marginBottom: 6,
  },

  pageTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
  },

  bigCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  redSmall: {
    color: "#D11A1A",
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 12,
  },

  bigNumber: {
    fontSize: 56,
    fontWeight: "800",
    color: "#111",
  },

  alertCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FDEAEA",
    justifyContent: "center",
    alignItems: "center",
  },

  desc: {
    marginTop: 8,
    color: "#374151",
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 18,
  },

  progressBg: {
    height: 6,
    backgroundColor: "#F8D6D6",
    borderRadius: 20,
  },

  progressFill: {
    width: "75%",
    height: 6,
    backgroundColor: "#D11A1A",
    borderRadius: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  smallCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
  },

  orangeText: {
    color: "#A84300",
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 12,
  },

  blueText: {
    color: "#004AC6",
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 12,
  },

  smallNumber: {
    fontSize: 44,
    fontWeight: "800",
    marginTop: 6,
    color: "#111",
  },

  grayText: {
    color: "#4B5563",
    marginTop: 18,
    fontSize: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
  },

  medicineCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },

  medName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
  },

  batch: {
    marginTop: 4,
    fontSize: 16,
    color: "#6B7280",
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },

  inline: {
    flexDirection: "row",
    alignItems: "center",
  },

  expiryText: {
    fontSize: 16,
    fontWeight: "700",
  },

  stockLabel: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  stockValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 14,
    paddingBottom: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    marginTop: 6,
    fontSize: 11,
    color: "#94A3B8",
  },

  activeNav: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: "center",
  },

  activeText: {
    marginTop: 6,
    fontSize: 11,
    color: "#fff",
  },
});