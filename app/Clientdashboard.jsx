import React, { useRef, useEffect, useState } from "react";
import { useRouter } from 'expo-router';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

const colors = {
  primary: "#0B57D0",
  secondary: "#0C8A43",
  background: "#F4F6F8",
  white: "#FFFFFF",
  text: "#111827",
  subText: "#6B7280",
  red: "#D11A1A",
};

function Counter({ value, prefix = "", style }) {
  const animated = useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = animated.addListener(({ value }) => {
      setCount(Math.floor(value));
    });

    Animated.timing(animated, {
      toValue: value,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    return () => animated.removeListener(id);
  }, []);

  return (
    <Text style={style}>
      {prefix}
      {count.toLocaleString()}
    </Text>
  );
}

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={28} color={colors.primary} />
            </View>
            <Text style={styles.brand}>Clinical Atelier</Text>
          </View>

          <TouchableOpacity>
            <MaterialIcons name="search" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Revenue Card */}
        <LinearGradient
          colors={["#0B57D0", "#8EB0E9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroLabel}>TODAY'S REVENUE</Text>

          <Counter
            value={3421}
            prefix="$"
            style={styles.heroAmount}
          />

          <View style={styles.badge}>
            <MaterialIcons name="trending-up" size={14} color="#6CF8BB" />
            <Text style={styles.badgeText}>12.5% vs yesterday</Text>
          </View>
        </LinearGradient>

        {/* Row 1 */}
        <View style={styles.row}>
          <View style={styles.smallCard}>
            <View style={[styles.iconWrap, { backgroundColor: "#DDEAFE" }]}>
              <MaterialIcons
                name="medical-services"
                size={24}
                color={colors.primary}
              />
            </View>

            <Text style={styles.cardLabel}>Total Medicines</Text>
            <Counter value={1284} style={styles.cardValue} />
          </View>

          <View style={styles.smallCard}>
            <View style={[styles.iconWrap, { backgroundColor: "#D7F8E6" }]}>
              <MaterialIcons
                name="inventory-2"
                size={24}
                color={colors.secondary}
              />
            </View>

            <Text style={styles.cardLabel}>Stock Health</Text>

            <View style={styles.inline}>
              <Text style={styles.cardValue}>82%</Text>
              <Text style={styles.greenText}>OPTIMAL</Text>
            </View>
          </View>
        </View>

        {/* Expiry */}
    <TouchableOpacity
  style={styles.expiryCard}
  activeOpacity={0.9}
  onPress={() => router.push("/ExpiryAlert")}
>
  <View style={styles.inline}>
    <View style={styles.redBox}>
      <MaterialIcons
        name="priority-high"
        size={24}
        color={colors.red}
      />
    </View>

    <View>
      <Text style={styles.cardLabel}>
        Expiring Soon
      </Text>
      <Text style={styles.smallText}>
        Next 30 days
      </Text>
    </View>
  </View>

  <View style={{ alignItems: "flex-end" }}>
    <Text style={styles.expiryCount}>42</Text>
    <Text style={styles.urgent}>URGENT</Text>
  </View>
</TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.actionCard}  onPress={() => router.push('/Addmedicine')}>
            <View style={styles.actionIcon} >
              <MaterialIcons name="add-circle" size={30} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Add Medicine</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/clientdashboard")}
          >
            <View style={styles.actionIcon}>
              <MaterialIcons
                name="receipt-long"
                size={30}
                color={colors.secondary}
              />
            </View>
            <Text style={styles.actionText}>Create Bill</Text>
          </TouchableOpacity>
        </View>

        {/* Stock */}
        <View style={styles.stockBox}>
          <View style={styles.stockHeader}>
            <Text style={styles.sectionTitle2}>Stock Analysis</Text>
            <MaterialIcons name="more-horiz" size={24} color="#111" />
          </View>

          {renderBar("Prescription Meds", 65, "#0B57D0")}
          {renderBar("OTC Products", 25, "#0C8A43")}
          {renderBar("Medical Supplies", 10, "#A84300")}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={["#0B57D0", "#A5BDEB"]}
          style={styles.fabInner}
        >
          <MaterialIcons name="add" size={36} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <View style={styles.activeTab}>
          <MaterialIcons name="dashboard" size={22} color="#fff" />
          <Text style={styles.activeText}>DASHBOARD</Text>
        </View>

        <View style={styles.navTab}>
          <MaterialIcons name="inventory-2" size={22} color="#94A3B8" />
          <Text style={styles.tabText}>INVENTORY</Text>
        </View>

        <View style={styles.navTab}>
          <MaterialIcons name="notifications" size={22} color="#94A3B8" />
          <Text style={styles.tabText}>ALERTS</Text>
        </View>

        <View style={styles.navTab}>
          <MaterialIcons name="bar-chart" size={22} color="#94A3B8" />
          <Text style={styles.tabText}>REPORTS</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function renderBar(title, percent, color) {
  return (
    <View style={{ marginTop: 18 }}>
      <View style={styles.progressTop}>
        <Text style={styles.barText}>{title}</Text>
        <Text style={styles.barText}>{percent}%</Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${percent}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DCEAFB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  brand: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },

  heroCard: {
    borderRadius: 28,
    padding: 28,
    minHeight: 220,
    justifyContent: "space-between",
    marginBottom: 18,
  },

  heroLabel: {
    color: "#E8F0FF",
    letterSpacing: 2,
    fontSize: 14,
  },

  heroAmount: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  smallCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
  },

  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  cardLabel: {
    fontSize: 15,
    color: "#374151",
  },

  cardValue: {
    fontSize: 38,
    fontWeight: "700",
    color: "#111",
    marginTop: 8,
  },

  inline: {
    flexDirection: "row",
    alignItems: "center",
  },

  greenText: {
    marginLeft: 8,
    color: colors.secondary,
    fontWeight: "700",
    marginTop: 18,
  },

  expiryCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  redBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#FCEAEA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  smallText: {
    color: "#6B7280",
    marginTop: 4,
  },

  expiryCount: {
    fontSize: 46,
    fontWeight: "700",
    color: colors.red,
  },

  urgent: {
    backgroundColor: "#FCEAEA",
    color: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 11,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111",
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 28,
    alignItems: "center",
  },

  actionIcon: {
    width: 74,
    height: 74,
    borderRadius: 22,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },

  stockBox: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 20,
    marginTop: 10,
  },

  stockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle2: {
    fontSize: 18,
    fontWeight: "700",
  },

  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  barText: {
    fontSize: 15,
    color: "#111",
  },

  track: {
    width: "100%",
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ECEFF3",
  },

  fill: {
    height: 10,
    borderRadius: 10,
  },

  fab: {
    position: "absolute",
    right: 24,
    bottom: 95,
  },

  fabInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  activeTab: {
    backgroundColor: "#0B57D0",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
  },

  activeText: {
    color: "#fff",
    fontSize: 11,
    marginTop: 4,
  },

  navTab: {
    alignItems: "center",
  },

  tabText: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 4,
  },
});