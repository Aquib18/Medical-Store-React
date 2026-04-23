import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default function EditMedicine() {
  const router = useRouter();
  const item = useLocalSearchParams();

  console.log("Medicine Data: ",item);

  const [medicineName, setMedicineName] = useState(
    item.medicineName || ""
  );
  const [type, setType] = useState(item.type || "");
  const [category, setCategory] = useState(
    item.category || ""
  );
  const [manufacturingdate, setManufacturingdate] =
    useState(item.manufacturingdate || "");
  const [expirydate, setExpirydate] = useState(
    item.expirydate || ""
  );
  const [totalQuantity, setTotalQuantity] =
    useState(item.totalQuantity || "");
  const [minimumStock, setMinimumStock] =
    useState(item.minimumStock || "");
  const [buyPrice, setBuyPrice] = useState(
    item.buyPrice || ""
  );
  const [sellPrice, setSellPrice] = useState(
    item.sellPrice || ""
  );
  const [alertQty, setAlertQty] = useState(
    item.alertQty || ""
  );

 const handleUpdate = async () => {
  if (!medicineName || !type) {
    Alert.alert(
      "Required",
      "Please fill required fields"
    );
    return;
  }

  if (!item.id) {
    Alert.alert(
      "Error",
      "Medicine ID not found"
    );
    return;
  }

  try {
    await updateDoc(
      doc(db, "medicines", String(item.id)),
      {
        medicineName,
        type,
        category,
        manufacturingdate,
        expirydate,
        totalQuantity,
        minimumStock,
        buyPrice,
        sellPrice,
        alertQty,
      }
    );

    Alert.alert(
      "Success",
      "Medicine Updated Successfully 🎉"
    );

    router.push("/MedicineList");

  } catch (error) {
    Alert.alert(
      "Error",
      error.message
    );
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 80,
        }}
      >
        <Text style={styles.title}>
          Edit Medicine
        </Text>

        {/* Medicine Name */}
        <TextInput
          style={styles.input}
          placeholder="Medicine Name"
          placeholderTextColor="#6B7280"
          value={medicineName}
          onChangeText={setMedicineName}
        />

        {/* Type */}
        <TextInput
          style={styles.input}
          placeholder="Type"
          placeholderTextColor="#6B7280"
          value={type}
          onChangeText={setType}
        />

        {/* Category */}
        <TextInput
          style={styles.input}
          placeholder="Category"
          placeholderTextColor="#6B7280"
          value={category}
          onChangeText={setCategory}
        />

        {/* MFG */}
        <TextInput
          style={styles.input}
          placeholder="Manufacturing Date"
          placeholderTextColor="#6B7280"
          value={manufacturingdate}
          onChangeText={
            setManufacturingdate
          }
        />

        {/* Expiry */}
        <TextInput
          style={styles.input}
          placeholder="Expiry Date"
          placeholderTextColor="#6B7280"
          value={expirydate}
          onChangeText={setExpirydate}
        />

        {/* Quantity */}
        <TextInput
          style={styles.input}
          placeholder="Total Quantity"
          placeholderTextColor="#6B7280"
          value={totalQuantity}
          onChangeText={
            setTotalQuantity
          }
          keyboardType="numeric"
        />

        {/* Minimum Stock */}
        <TextInput
          style={styles.input}
          placeholder="Minimum Stock"
          placeholderTextColor="#6B7280"
          value={minimumStock}
          onChangeText={
            setMinimumStock
          }
          keyboardType="numeric"
        />

        {/* Buy Price */}
        <TextInput
          style={styles.input}
          placeholder="Buy Price"
          placeholderTextColor="#6B7280"
          value={buyPrice}
          onChangeText={setBuyPrice}
          keyboardType="numeric"
        />

        {/* Sell Price */}
        <TextInput
          style={styles.input}
          placeholder="Sell Price"
          placeholderTextColor="#6B7280"
          value={sellPrice}
          onChangeText={setSellPrice}
          keyboardType="numeric"
        />

        {/* Alert Qty */}
        <TextInput
          style={styles.input}
          placeholder="Alert Quantity"
          placeholderTextColor="#6B7280"
          value={alertQty}
          onChangeText={setAlertQty}
          keyboardType="numeric"
        />

        {/* Update Button */}
        <TouchableOpacity
          onPress={handleUpdate}
        >
          <LinearGradient
            colors={[
              "#004AC6",
              "#2563EB",
            ]}
            style={styles.btn}
          >
            <MaterialIcons
              name="save"
              size={22}
              color="#fff"
            />
            <Text style={styles.btnText}>
              Update Medicine
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F8FAFC",
    },

    title: {
      fontSize: 28,
      fontWeight: "800",
      marginBottom: 18,
      color: "#111827",
    },

    input: {
      height: 56,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      borderRadius: 14,
      paddingHorizontal: 14,
      backgroundColor:
        "#fff",
      marginBottom: 14,
      fontSize: 16,
      color: "#111",
    },

    btn: {
      height: 56,
      borderRadius: 14,
      justifyContent:
        "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
    },

    btnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
      marginLeft: 8,
    },
  });