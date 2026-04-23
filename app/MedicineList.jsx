import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchMedicines();
  }, [sortType]);

  const fetchMedicines = async () => {
    try {
      let q;

      if (sortType === "oldest") {
        q = query(
          collection(db, "medicines"),
          orderBy("createdAt", "asc")
        );
      } else if (sortType === "az") {
        q = query(
          collection(db, "medicines"),
          orderBy("medicineName", "asc")
        );
      } else if (sortType === "za") {
        q = query(
          collection(db, "medicines"),
          orderBy("medicineName", "desc")
        );
      } else {
        q = query(
          collection(db, "medicines"),
          orderBy("createdAt", "desc")
        );
      }

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setMedicines(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMedicines = useMemo(() => {
    return medicines.filter((item) =>
      item.medicineName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [medicines, search]);

  const deleteMedicine = (id) => {
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
            await deleteDoc(doc(db, "medicines", id));
            fetchMedicines();
          },
        },
      ]
    );
  };

  const getSortLabel = () => {
    if (sortType === "oldest") return "First Added";
    if (sortType === "az") return "A to Z";
    if (sortType === "za") return "Z to A";
    return "Recent Added";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={["#004AC6", "#2563EB"]}
        style={styles.header}
      >
        <Text style={styles.smallText}>
          INVENTORY CONTROL
        </Text>

        <Text style={styles.title}>
          Medicine List
        </Text>

        <View style={styles.searchBox}>
          <MaterialIcons
            name="search"
            size={22}
            color="#6B7280"
          />

          <TextInput
            placeholder="Search medicine..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {filteredMedicines.length}
          </Text>

          <Text style={styles.statLabel}>
            Total Medicines
          </Text>
        </View>

        <View style={styles.statCard}>
          <TouchableOpacity
            onPress={() =>
              setShowDropdown(!showDropdown)
            }
          >
            <View style={styles.dropRow}>
              <Text style={styles.recentText}>
                {getSortLabel()}
              </Text>

              <MaterialIcons
                name="keyboard-arrow-down"
                size={22}
                color="#111"
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.statLabel}>
            Sort List
          </Text>

          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                onPress={() => {
                  setSortType("newest");
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropItem}>
                  Recent Added
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSortType("oldest");
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropItem}>
                  First Added
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSortType("az");
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropItem}>
                  A to Z
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSortType("za");
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropItem}>
                  Z to A
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 120,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/MedicineDetails",
                params: {
                    id: item.id,
                  medicineName:
                    item.medicineName || "",
                  type: item.type || "",
                  category:
                    item.category || "",
                  expirydate:
                    item.expirydate || "",
                  manufacturingdate:
                    item.manufacturingdate ||
                    "",
                  totalQuantity:
                    item.totalQuantity ||
                    "",
                  minimumStock:
                    item.minimumStock ||
                    "",
                  buyPrice:
                    item.buyPrice || "",
                  sellPrice:
                    item.sellPrice || "",
                  qty: item.qty || "",
                  alertQty:
                    item.alertQty || "",
                  image: item.image || "",
                },
              })
            }
          >
            <View style={styles.card}>
              <View style={styles.topRow}>
                <View style={styles.iconBox}>
                  <MaterialIcons
                    name="medical-services"
                    size={22}
                    color="#004AC6"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>
                    {index + 1}.{" "}
                    {item.medicineName}
                  </Text>

                  <Text style={styles.sub}>
                    {item.type} •{" "}
                    {item.category}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    deleteMedicine(item.id)
                  }
                >
                  <MaterialIcons
                    name="delete"
                    size={24}
                    color="#DC2626"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.info}>
                  Qty:{" "}
                  {item.totalQuantity}
                </Text>

                <Text style={styles.info}>
                  Exp:{" "}
                  {item.expirydate}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  smallText: {
    color: "#C7D8FF",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "700",
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 5,
    marginBottom: 18,
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    height: 54,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: -18,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    elevation: 3,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#004AC6",
  },

  recentText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },

  statLabel: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 12,
  },

  dropRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdown: {
    marginTop: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingVertical: 6,
  },

  dropItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF1FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111",
  },

  sub: {
    color: "#6B7280",
    marginTop: 3,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
  },

  info: {
    color: "#374151",
    fontWeight: "600",
  },
});