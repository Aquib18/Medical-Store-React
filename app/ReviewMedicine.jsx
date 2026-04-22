import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ReviewMedicine() {
  const router = useRouter();

  const {
    medicineName,
    type,
    category,
    expirydate,
    manufacturingdate,
    totalQuantity,
    minimumStock,
    buyPrice,
    sellPrice,
  } = useLocalSearchParams();

  const handleEdit = () => {
    router.back();
  };

  const handleDelete = () => {
    router.back();
  };

  const handleSave = () => {
    alert("Medicine Saved Successfully ✅");
    router.push("/Dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color="#111"
            />
          </TouchableOpacity>

          <Text style={styles.title}>Review Medicine</Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.name}>{medicineName}</Text>

          <Text style={styles.item}>Type: {type}</Text>
          <Text style={styles.item}>Category: {category}</Text>
          <Text style={styles.item}>Expiry: {expirydate}</Text>
          <Text style={styles.item}>
            MFG: {manufacturingdate}
          </Text>
          <Text style={styles.item}>
            Quantity: {totalQuantity}
          </Text>
          <Text style={styles.item}>
            Minimum Stock: {minimumStock}
          </Text>
          <Text style={styles.item}>
            Buy Price: ₹{buyPrice}
          </Text>
          <Text style={styles.item}>
            Sell Price: ₹{sellPrice}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={handleEdit}
          >
            <MaterialIcons
              name="edit"
              size={20}
              color="#004AC6"
            />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
          >
            <MaterialIcons
              name="delete"
              size={20}
              color="#BA1A1A"
            />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handleSave}>
        <LinearGradient
          colors={["#004AC6", "#2563EB"]}
          style={styles.saveBtn}
        >
          <Text style={styles.saveText}>Save Medicine</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 25,
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 14,
    color: "#004AC6",
  },

  item: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  editBtn: {
    width: "48%",
    height: 55,
    borderRadius: 16,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  deleteBtn: {
    width: "48%",
    height: 55,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  editText: {
    marginLeft: 6,
    color: "#004AC6",
    fontWeight: "700",
  },

  deleteText: {
    marginLeft: 6,
    color: "#BA1A1A",
    fontWeight: "700",
  },

  saveBtn: {
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});