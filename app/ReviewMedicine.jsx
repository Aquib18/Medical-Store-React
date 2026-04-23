import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

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
    qty,
    alertQty,
    image,
    id,
  } = useLocalSearchParams();

  // Edit Page
  const handleEdit = () => {
    router.push({
      pathname: "/EditMedicine",
      params: {
        id,
        medicineName,
        type,
        category,
        expirydate,
        manufacturingdate,
        totalQuantity,
        minimumStock,
        buyPrice,
        sellPrice,
        qty,
        alertQty,
        image,
      },
    });
  };

  // Delete (preview only)
  const handleDelete = () => {
    Alert.alert(
      "Delete Medicine",
      "Do you want to remove this medicine?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]
    );
  };

  // Save and go list
  const handleSave = async () => {
    try {
      await addDoc(collection(db, "medicines"), {
        medicineName: medicineName || "",
        type: type || "",
        category: category || "",
        expirydate: expirydate || "",
        manufacturingdate: manufacturingdate || "",
        totalQuantity: totalQuantity || "",
        minimumStock: minimumStock || "",
        buyPrice: buyPrice || "",
        sellPrice: sellPrice || "",
        qty: qty || "",
        alertQty: alertQty || "",
        image: image || "",
        createdAt: new Date(),
      });

      Alert.alert(
        "Success",
        "Medicine Saved Successfully ✅"
      );

      router.replace("/Addmedicine");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <MaterialIcons
              name="arrow-back"
              size={22}
              color="#111"
            />
          </TouchableOpacity>

          <Text style={styles.title}>
            Review Medicine
          </Text>

          <View style={{ width: 42 }} />
        </View>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <MaterialIcons
              name="medical-services"
              size={32}
              color="#004AC6"
            />
          </View>

          <Text style={styles.name}>
            {medicineName}
          </Text>

          <View style={styles.line} />

          <Text style={styles.item}>
            Type: {type}
          </Text>

          <Text style={styles.item}>
            Category: {category}
          </Text>

          <Text style={styles.item}>
            Expiry Date: {expirydate}
          </Text>

          <Text style={styles.item}>
            Manufacturing Date:{" "}
            {manufacturingdate}
          </Text>

          <Text style={styles.item}>
            Total Quantity:{" "}
            {totalQuantity}
          </Text>

          <Text style={styles.item}>
            Minimum Stock:{" "}
            {minimumStock}
          </Text>

          <Text style={styles.item}>
            Buy Price: ₹{buyPrice}
          </Text>

          <Text style={styles.item}>
            Sell Price: ₹{sellPrice}
          </Text>

          <Text style={styles.item}>
            Alert Qty: {alertQty}
          </Text>
        </View>

        {/* Action Buttons */}
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

            <Text style={styles.editText}>
              Edit
            </Text>
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

            <Text style={styles.deleteText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={["#004AC6", "#2563EB"]}
          style={styles.saveBtn}
        >
          <Text style={styles.saveText}>
            Save Medicine
          </Text>
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
    marginBottom: 22,
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 14,
  },

  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#004AC6",
    textAlign: "center",
    marginBottom: 12,
  },

  line: {
    height: 1,
    backgroundColor: "#EEF2F7",
    marginBottom: 14,
  },

  item: {
    fontSize: 16,
    color: "#333",
    marginBottom: 11,
    fontWeight: "500",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editBtn: {
    width: "48%",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  deleteBtn: {
    width: "48%",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  editText: {
    marginLeft: 7,
    color: "#004AC6",
    fontWeight: "700",
    fontSize: 15,
  },

  deleteText: {
    marginLeft: 7,
    color: "#BA1A1A",
    fontWeight: "700",
    fontSize: 15,
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