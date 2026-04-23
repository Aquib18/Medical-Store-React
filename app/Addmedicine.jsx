import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function AddMedicine() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [medicineName, setMedicineName] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [minimumStock, setMinimumStock] = useState("");
  //   const [type, setType] = useState("Tablet");
  //   const [category, setCategory] = useState("Antibiotic");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [expirydate, setExpirydate] = useState("");
  const [manufacturingdate, setManufacturingdate] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [qty, setQty] = useState("");
  const [alertQty, setAlertQty] = useState("10");

  const pickImage = async () => {
    Alert.alert(
      "Upload Image",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: openCamera,
        },
        {
          text: "Gallery",
          onPress: openGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const openGallery = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Please allow gallery permission");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Please allow camera permission");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  
  const handleRegister = async () => {
    if (
      !medicineName ||
      !type ||
      !category ||
      !expirydate
    ) {
      Alert.alert(
        "Required",
        "Please fill all required fields"
      );
      return;
    }

    router.replace({
      pathname: "/ReviewMedicine",
      params: {
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

  // const handleRegister = () => {
  //   if (
  //     !medicineName ||
  //     !type ||
  //     !category ||
  //     !expirydate ||
  //     !totalQuantity
  //   ) {
  //     Alert.alert(
  //       "Required Fields",
  //       "Please fill all fields"
  //     );
  //     return;
  //   }
  //   router.push({
  //     pathname: "/ReviewMedicine",
  //     params: {
  //       medicineName,
  //       type,
  //       category,
  //       expirydate,
  //       manufacturingdate,
  //       totalQuantity,
  //       minimumStock,
  //       buyPrice,
  //       sellPrice,
  //     },
  //   });

  //   Alert.alert(
  //     "Success",
  //     "Medicine Registered Successfully 🎉",
  //     [
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           setImage(null);
  //           setMedicineName("");
  //           setType("");
  //           setCategory("");
  //           setExpirydate("");
  //           setManufacturingdate("");
  //           setTotalQuantity("");
  //           setMinimumStock("");
  //           setBuyPrice("");
  //           setSellPrice("");
  //           setQty("");
  //           setAlertQty("10");
  //         },
  //       },
  //     ]


  //     [{
  //       text: "OK",
  //       onPress: () => {
  //         router.push("/ReviewMedicine");
  //       }
  //     }]
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F7F9FB" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#555" />
          </TouchableOpacity>

          <Text style={styles.brand}>Clinical Atelier</Text>
        </View>

        <View style={styles.rightHeader}>
          <MaterialIcons name="search" size={24} color="#004AC6" />
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={20} color="#004AC6" />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Heading */}
        <View style={styles.topText}>
          <Text style={styles.smallTitle}>INVENTORY MANAGEMENT</Text>
          <Text style={styles.pageTitle}>Add Medicine</Text>
          <Text style={styles.subTitle}>
            Input clinical details and logistics for new stock entry.
          </Text>
        </View>

        {/* Upload */}
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <>
              <MaterialIcons name="add-a-photo" size={38} color="#004AC6" />
              <Text style={styles.uploadTitle}>Upload Packaging Box</Text>
              <Text style={styles.uploadSub}>JPG, PNG or WEBP (Max 5MB)</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Basic Details */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.blueLine} />
            <Text style={styles.cardTitle}>Basic Details</Text>
          </View>

          {/* Medicine Name */}
          <Text style={styles.label}>Medicine Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Amoxicillin 500mg"
            placeholderTextColor="#6B7280"
            value={medicineName}
            onChangeText={setMedicineName}
          />

          {/* Type */}
          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Tablet / Syrup / Capsule"
            placeholderTextColor="#6B7280"
            value={type}
            onChangeText={setType}
          />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Antibiotic / Fever / Painkiller"
            placeholderTextColor="#6B7280"
            value={category}
            onChangeText={setCategory}
          />

          {/* Expiry Date */}
          {/* <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD-MM-YYYY"
            placeholderTextColor="#6B7280"
            value={expirydate}
            onChangeText={setExpirydate}
          /> */}
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD-MM-YYYY"
            placeholderTextColor="#6B7280"
            keyboardType="number-pad"
            maxLength={10}
            value={expirydate}
            onChangeText={(text) => {
              let cleaned = text.replace(/\D/g, "");

              if (cleaned.length > 2)
                cleaned =
                  cleaned.slice(0, 2) +
                  "-" +
                  cleaned.slice(2);

              if (cleaned.length > 5)
                cleaned =
                  cleaned.slice(0, 5) +
                  "-" +
                  cleaned.slice(5, 9);

              setExpirydate(cleaned);
            }}
          />

          {/* Manufacturing Date */}
          <Text style={styles.label}>Manufacturing Date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD-MM-YYYY"
            placeholderTextColor="#6B7280"
            keyboardType="number-pad"
            maxLength={10}
            value={manufacturingdate}
            onChangeText={(text) => {
              let cleaned = text.replace(/\D/g, "");

              if (cleaned.length > 2)
                cleaned =
                  cleaned.slice(0, 2) +
                  "-" +
                  cleaned.slice(2);

              if (cleaned.length > 5)
                cleaned =
                  cleaned.slice(0, 5) +
                  "-" +
                  cleaned.slice(5, 9);

              setManufacturingdate(cleaned);
            }}
          />

          <Text style={styles.label}>Total Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
            value={totalQuantity}
            onChangeText={setTotalQuantity}
          />

          <Text style={styles.label}>Minimum Stock Alert</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter minimum stock"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
            value={minimumStock}
            onChangeText={setMinimumStock}
          />
        </View>

        {/* Pricing */}
        <View style={styles.glassCard}>
          <View style={styles.titleRow}>
            <View style={[styles.blueLine, { backgroundColor: "#006C49" }]} />
            <Text style={styles.cardTitle}>Pricing Structure</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>BUY PRICE</Text>
              <TextInput
                placeholder="0.00"
                keyboardType="numeric"
                value={buyPrice}
                onChangeText={setBuyPrice}
                style={styles.priceInput}
              />
            </View>

            <View style={styles.priceBox}>
              <Text style={[styles.priceLabel, { color: "#004AC6" }]}>
                SELL PRICE
              </Text>
              <TextInput
                placeholder="0.00"
                keyboardType="numeric"
                value={sellPrice}
                onChangeText={setSellPrice}
                style={styles.priceInput}
              />
            </View>
          </View>

          <View style={styles.marginRow}>
            <Text style={styles.marginText}>Estimated Margin:</Text>
            <Text style={styles.marginBadge}>+24.5%</Text>
          </View>
        </View>

        {/* Stock */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <View style={[styles.blueLine, { backgroundColor: "#943700" }]} />
            <Text style={styles.cardTitle}>Stock Logistics</Text>
          </View>

          <View style={styles.stockRow}>
            <View style={styles.stockLeft}>
              <View style={styles.circleBrown}>
                <MaterialIcons name="inventory-2" size={22} color="#943700" />
              </View>

              <View>
                <Text style={styles.stockTitle}>Current Quantity</Text>
                <Text style={styles.stockSub}>Total units in hand</Text>
              </View>
            </View>

            <TextInput
              style={styles.stockInput}
              placeholder="0"
              keyboardType="numeric"
              value={qty}
              onChangeText={setQty}
            />
          </View>

          <View style={styles.stockRow}>
            <View style={styles.stockLeft}>
              <View style={styles.circleRed}>
                <MaterialIcons name="warning" size={22} color="#BA1A1A" />
              </View>

              <View>
                <Text style={styles.stockTitle}>Low Stock Alert</Text>
                <Text style={styles.stockSub}>Notify when below</Text>
              </View>
            </View>

            <TextInput
              style={styles.stockInput}
              keyboardType="numeric"
              value={alertQty}
              onChangeText={setAlertQty}
            />
          </View>
          {/* <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={expiryDate}
            onChangeText={setExpiryDate}
          /> */}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.9}
          onPress={handleRegister}
        >
          <LinearGradient
            colors={["#004AC6", "#2563EB"]}
            style={styles.saveBtn}
          >
            <Text style={styles.saveText}>Register Medicine</Text>
            <MaterialIcons name="chevron-right" size={24} color="#fff" />
          </LinearGradient>
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
    paddingTop: 8,
    marginBottom: 14,
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  backBtn: {
    marginRight: 10,
  },

  brand: {
    fontSize: 18,
    fontWeight: "800",
    color: "#004AC6",
  },

  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  topText: {
    marginBottom: 24,
  },

  smallTitle: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#004AC6",
    fontWeight: "700",
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 4,
    color: "#111",
  },

  subTitle: {
    marginTop: 6,
    color: "#6B7280",
  },

  uploadBox: {
    height: 220,
    borderRadius: 22,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,

    //  borderWidth: 2,
    // borderColor: "#dbeafe",
    // borderStyle: "dashed",
    // borderRadius: 14,
    // padding: 25,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#f8fbff",
    // marginTop: 15,
  },

  uploadTitle: {
    marginTop: 10,
    fontWeight: "700",
    fontSize: 16,
  },

  uploadSub: {
    marginTop: 4,
    color: "#292628ff",
    fontSize: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },

  glassCard: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  blueLine: {
    width: 4,
    height: 24,
    borderRadius: 10,
    backgroundColor: "#004AC6",
    marginRight: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
    marginLeft: 2,
  },

  input: {
    height: 52,
    backgroundColor: "#EEF2F7",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  priceBox: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 18,
    padding: 14,
  },

  priceLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#006C49",
    marginBottom: 10,
  },

  priceInput: {
    fontSize: 24,
    fontWeight: "700",
  },

  marginRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  marginText: {
    color: "#6B7280",
  },

  marginBadge: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: "700",
  },

  stockRow: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  stockLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  circleBrown: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFE6D9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  circleRed: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  stockTitle: {
    fontWeight: "700",
  },

  stockSub: {
    fontSize: 12,
    color: "#6B7280",
  },

  stockInput: {
    fontSize: 24,
    fontWeight: "700",
    minWidth: 50,
    textAlign: "right",
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },

  saveBtn: {
    height: 60,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginRight: 6,
  },

  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

});