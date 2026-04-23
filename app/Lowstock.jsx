import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from "react-native";

import { useRouter, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
} from "firebase/firestore";

export default function LowStock() {
    const router = useRouter();

    const [medicines, setMedicines] =
        useState([]);

    useFocusEffect(
        useCallback(() => {
            loadLowStock();
        }, [])
    );

    const loadLowStock =
        async () => {
            try {
                const snapshot =
                    await getDocs(
                        collection(
                            db,
                            "medicines"
                        )
                    );

                let arr = [];

                snapshot.forEach(
                    (doc) => {
                        const data =
                            doc.data();

                        const qty =
                            Number(
                                data.totalQuantity ||
                                0
                            );

                        const min =
                            Number(
                                data.minimumStock ||
                                0
                            );

                        if (
                            qty <= min
                        ) {
                            arr.push({
                                id: doc.id,
                                name:
                                    data.medicineName,
                                type:
                                    data.type,
                                category:
                                    data.category,
                                qty,
                                min,
                                expiry:
                                    data.expirydate,
                            });
                        }
                    }
                );

                setMedicines(arr);
            } catch (error) {
                console.log(error);
            }
        };

    return (
        <SafeAreaView
            style={
                styles.container
            }
        >
            <StatusBar
                backgroundColor="#F8FAFC"
                barStyle="dark-content"
            />

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
            >
                {/* Header */}
                <View
                    style={
                        styles.header
                    }
                >
                    <TouchableOpacity
                        onPress={() =>
                            router.back()
                        }
                    >
                        <MaterialIcons
                            name="arrow-back"
                            size={28}
                            color="#111"
                        />
                    </TouchableOpacity>

                    <Text
                        style={
                            styles.title
                        }
                    >
                        Low Stock
                    </Text>

                    <View
                        style={{
                            width: 28,
                        }}
                    />
                </View>

                {/* Summary */}
                <View
                    style={
                        styles.summary
                    }
                >
                    <Text
                        style={
                            styles.bigNo
                        }
                    >
                        {
                            medicines.length
                        }
                    </Text>

                    <Text
                        style={
                            styles.summaryText
                        }
                    >
                        Medicines Need
                        Restock
                    </Text>
                </View>

                {/* List */}
              // REPLACE only List map section with this code

{medicines.map((item, index) => (
  <TouchableOpacity
    key={index}
    activeOpacity={0.9}
    onPress={() =>
      router.push({
        pathname: "/MedicineDetails",
        params: {
          id: item.id,
          medicineName: item.name,
          type: item.type,
          category: item.category,
          expirydate: item.expiry,
          totalQuantity: item.qty,
          minimumStock: item.min,
        },
      })
    }
  >
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.sub}>
            {item.type} • {item.category}
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            LOW
          </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.info}>
          Qty: {item.qty}
        </Text>

        <Text style={styles.info}>
          Min: {item.min}
        </Text>

        <Text style={styles.info}>
          Exp: {item.expiry}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
))}

                {medicines.length ===
                    0 && (
                        <Text
                            style={
                                styles.empty
                            }
                        >
                            No Low Stock
                            Medicines
                        </Text>
                    )}

                <View
                    style={{
                        height: 40,
                    }}
                />
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
            padding: 16,
        },

        header: {
            flexDirection:
                "row",
            justifyContent:
                "space-between",
            alignItems:
                "center",
            marginTop: 8,
            marginBottom: 20,
        },

        title: {
            fontSize: 26,
            fontWeight:
                "800",
            color:
                "#111827",
        },

        summary: {
            backgroundColor:
                "#fff",
            borderRadius: 22,
            padding: 22,
            marginBottom: 18,
            alignItems:
                "center",
        },

        bigNo: {
            fontSize: 48,
            fontWeight:
                "800",
            color:
                "#DC2626",
        },

        summaryText: {
            marginTop: 6,
            color:
                "#555",
            fontSize: 16,
        },

        card: {
            backgroundColor:
                "#fff",
            borderRadius: 20,
            padding: 16,
            marginBottom: 14,
        },

        topRow: {
            flexDirection:
                "row",
            justifyContent:
                "space-between",
            alignItems:
                "center",
        },

        name: {
            fontSize: 18,
            fontWeight:
                "800",
            color:
                "#111",
        },

        sub: {
            color:
                "#666",
            marginTop: 4,
        },

        badge: {
            backgroundColor:
                "#FEE2E2",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 14,
        },

        badgeText: {
            color:
                "#DC2626",
            fontWeight:
                "800",
            fontSize: 11,
        },

        bottom: {
            flexDirection:
                "row",
            justifyContent:
                "space-between",
            marginTop: 16,
            borderTopWidth: 1,
            borderTopColor:
                "#EEF2F7",
            paddingTop: 12,
        },

        info: {
            fontWeight:
                "700",
            color:
                "#374151",
            fontSize: 13,
        },

        empty: {
            textAlign:
                "center",
            marginTop: 30,
            color:
                "#666",
            fontSize: 16,
        },
    });