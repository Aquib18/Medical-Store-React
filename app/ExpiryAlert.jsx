import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import {
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";

import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function ExpiryAlerts() {
  const router = useRouter();

  const [medicines, setMedicines] =
    useState([]);

  const [sevenDays, setSevenDays] =
    useState(0);

  const [thirtyDays, setThirtyDays] =
    useState(0);

  const [sixtyDays, setSixtyDays] =
    useState(0);

  useEffect(() => {
    loadExpiryMedicines();
  }, []);

  const loadExpiryMedicines =
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
        let count7 = 0;
        let count30 = 0;
        let count60 = 0;

        const today =
          new Date();

        snapshot.forEach(
          (doc) => {
            const data =
              doc.data();

            if (
              data.expirydate
            ) {
              const parts =
                data.expirydate.split(
                  "-"
                );

              if (
                parts.length ===
                3
              ) {
                const expDate =
                  new Date(
                    parts[2],
                    parts[1] -
                      1,
                    parts[0]
                  );

                const diff =
                  Math.ceil(
                    (expDate -
                      today) /
                      (1000 *
                        60 *
                        60 *
                        24)
                  );

                if (
                  diff >= 0
                ) {
                  let level =
                    "MONITORED";

                  let color =
                    "#004AC6";

                  let bg =
                    "#E8F0FF";

                  let icon =
                    "time";

                  if (
                    diff <= 7
                  ) {
                    level =
                      "CRITICAL";
                    color =
                      "#D11A1A";
                    bg =
                      "#FDEAEA";
                    icon =
                      "close-circle";
                    count7++;
                  } else if (
                    diff <=
                    30
                  ) {
                    level =
                      "HIGH RISK";
                    color =
                      "#A84300";
                    bg =
                      "#FFF1E8";
                    icon =
                      "warning";
                    count30++;
                  } else if (
                    diff <=
                    60
                  ) {
                    count60++;
                  }

                  if (
                    diff <=
                    60
                  ) {
                    arr.push(
                      {
                        id: doc.id,
                        name:
                          data.medicineName,
                        batch:
                          data.category ||
                          "N/A",
                        expiry:
                          data.expirydate,
                        stock:
                          data.totalQuantity ||
                          0,
                        level,
                        color,
                        bg,
                        icon,
                      }
                    );
                  }
                }
              }
            }
          }
        );

        setMedicines(arr);
        setSevenDays(
          count7
        );
        setThirtyDays(
          count30
        );
        setSixtyDays(
          count60
        );
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
        backgroundColor="#F7F9FB"
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
          <Text
            style={
              styles.pageTitle
            }
          >
            Expiry Alerts
          </Text>

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
        </View>

        {/* Big Card */}
        <View
          style={
            styles.bigCard
          }
        >
          <Text
            style={
              styles.redSmall
            }
          >
            7 DAYS
          </Text>

          <Text
            style={
              styles.bigNumber
            }
          >
            {sevenDays}
          </Text>

          <Text
            style={
              styles.desc
            }
          >
            Immediate
            expiry action
            required
          </Text>
        </View>

        {/* Small Cards */}
        <View
          style={styles.row}
        >
          <View
            style={
              styles.smallCard
            }
          >
            <Text
              style={
                styles.orangeText
              }
            >
              30 DAYS
            </Text>

            <Text
              style={
                styles.smallNumber
              }
            >
              {thirtyDays}
            </Text>

            <Text
              style={
                styles.grayText
              }
            >
              High Risk
            </Text>
          </View>

          <View
            style={
              styles.smallCard
            }
          >
            <Text
              style={
                styles.blueText
              }
            >
              60 DAYS
            </Text>

            <Text
              style={
                styles.smallNumber
              }
            >
              {sixtyDays}
            </Text>

            <Text
              style={
                styles.grayText
              }
            >
              Monitor
            </Text>
          </View>
        </View>

        {/* Section */}
        <Text
          style={
            styles.sectionTitle
          }
        >
          Expiring
          Medicines
        </Text>

        {/* List */}
        {medicines.map(
          (
            item,
            index
          ) => (
            <View
              key={
                index
              }
              style={
                styles.medicineCard
              }
            >
              <View
                style={
                  styles.rowBetween
                }
              >
                <View>
                  <Text
                    style={
                      styles.medName
                    }
                  >
                    {
                      item.name
                    }
                  </Text>

                  <Text
                    style={
                      styles.batch
                    }
                  >
                    Category:
                    {
                      item.batch
                    }
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        item.bg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        color:
                          item.color,
                      },
                    ]}
                  >
                    {
                      item.level
                    }
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.rowBetween,
                  {
                    marginTop: 18,
                  },
                ]}
              >
                <View
                  style={
                    styles.inline
                  }
                >
                  <Ionicons
                    name={
                      item.icon
                    }
                    size={
                      18
                    }
                    color={
                      item.color
                    }
                  />

                  <Text
                    style={[
                      styles.expiryText,
                      {
                        color:
                          item.color,
                      },
                    ]}
                  >
                    {" "}
                    Expires:{" "}
                    {
                      item.expiry
                    }
                  </Text>
                </View>

                <View>
                  <Text
                    style={
                      styles.stockLabel
                    }
                  >
                    STOCK
                  </Text>

                  <Text
                    style={
                      styles.stockValue
                    }
                  >
                    {
                      item.stock
                    }{" "}
                    Units
                  </Text>
                </View>
              </View>
            </View>
          )
        )}

        {medicines.length ===
          0 && (
          <Text
            style={{
              textAlign:
                "center",
              marginTop: 30,
              color:
                "#666",
              fontSize: 16,
            }}
          >
            No Expiring
            Medicines
          </Text>
        )}

        <View
          style={{
            height: 50,
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
        "#F7F9FB",
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
      marginBottom: 18,
    },

    pageTitle: {
      fontSize: 32,
      fontWeight:
        "800",
      color:
        "#111827",
    },

    bigCard: {
      backgroundColor:
        "#fff",
      borderRadius: 22,
      padding: 20,
      marginBottom: 16,
    },

    redSmall: {
      color:
        "#D11A1A",
      fontWeight:
        "700",
    },

    bigNumber: {
      fontSize: 54,
      fontWeight:
        "800",
      color: "#111",
    },

    desc: {
      color:
        "#555",
      fontSize: 16,
    },

    row: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom: 20,
    },

    smallCard: {
      width: "48%",
      backgroundColor:
        "#fff",
      borderRadius: 20,
      padding: 18,
    },

    orangeText: {
      color:
        "#A84300",
      fontWeight:
        "700",
    },

    blueText: {
      color:
        "#004AC6",
      fontWeight:
        "700",
    },

    smallNumber: {
      fontSize: 40,
      fontWeight:
        "800",
      marginTop: 5,
    },

    grayText: {
      marginTop: 10,
      color:
        "#555",
    },

    sectionTitle: {
      fontSize: 24,
      fontWeight:
        "800",
      marginBottom: 14,
    },

    medicineCard: {
      backgroundColor:
        "#fff",
      borderRadius: 22,
      padding: 18,
      marginBottom: 14,
    },

    rowBetween: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    medName: {
      fontSize: 20,
      fontWeight:
        "800",
      color:
        "#111",
    },

    batch: {
      marginTop: 4,
      color:
        "#666",
    },

    badge: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 16,
    },

    badgeText: {
      fontSize: 11,
      fontWeight:
        "800",
    },

    inline: {
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    expiryText: {
      fontWeight:
        "700",
    },

    stockLabel: {
      color:
        "#999",
      fontSize: 12,
    },

    stockValue: {
      fontSize: 17,
      fontWeight:
        "800",
      color:
        "#111",
    },
  });