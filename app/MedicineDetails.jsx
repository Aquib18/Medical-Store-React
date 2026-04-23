import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { db } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export default function MedicineDetails() {
  const item = useLocalSearchParams();
  const router = useRouter();

  const handleDelete = () => {
    Alert.alert(
      "Delete Medicine",
      "Are you sure you want to delete this medicine?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(
                doc(db, "medicines", item.id)
              );

              Alert.alert(
                "Deleted Successfully"
              );

              router.replace(
                "/MedicineList"
              );
            } catch (error) {
              Alert.alert(
                "Error",
                error.message
              );
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
  router.push({
    pathname: "/EditMedicine",
    params: {
      id: item.id,
      medicineName: item.medicineName,
      type: item.type,
      category: item.category,
      expirydate: item.expirydate,
      manufacturingdate: item.manufacturingdate,
      totalQuantity: item.totalQuantity,
      minimumStock: item.minimumStock,
      buyPrice: item.buyPrice,
      sellPrice: item.sellPrice,
      alertQty: item.alertQty,
    },
  });
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 80,
        }}
      >
        <Text style={styles.title}>
          Medicine Details
        </Text>

        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
        ) : null}

        <View style={styles.card}>
          <Text style={styles.label}>
            Name: {item.medicineName}
          </Text>

          <Text style={styles.label}>
            Type: {item.type}
          </Text>

          <Text style={styles.label}>
            Category: {item.category}
          </Text>

          <Text style={styles.label}>
            MFG Date: {item.manufacturingdate}
          </Text>

          <Text style={styles.label}>
            Expiry Date: {item.expirydate}
          </Text>

          <Text style={styles.label}>
            Quantity: {item.totalQuantity}
          </Text>

          <Text style={styles.label}>
            Minimum Stock: {item.minimumStock}
          </Text>

          <Text style={styles.label}>
            Buy Price: ₹{item.buyPrice}
          </Text>

          <Text style={styles.label}>
            Sell Price: ₹{item.sellPrice}
          </Text>

          <Text style={styles.label}>
            Alert Qty: {item.alertQty}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={handleEdit}
          >
            <MaterialIcons
              name="edit"
              size={22}
              color="#fff"
            />
            <Text style={styles.btnText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
          >
            <MaterialIcons
              name="delete"
              size={22}
              color="#fff"
            />
            <Text style={styles.btnText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  editBtn: {
    width: "48%",
    height: 54,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteBtn: {
    width: "48%",
    height: 54,
    backgroundColor: "#DC2626",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});