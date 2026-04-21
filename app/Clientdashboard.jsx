import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#004AC6',
  secondary: '#006C49',
  surface: '#F7F9FB',
  white: '#FFFFFF',
  error: '#BA1A1A',
};

function AnimatedNumber({ value, prefix = '', style }) {
  const animated = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const listener = animated.addListener(({ value }) => {
      setDisplay(Math.floor(value));
    });

    Animated.timing(animated, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    return () => {
      animated.removeListener(listener);
    };
  }, [value]);

  return (
    <Text style={style}>
      {prefix}
      {display}
    </Text>
  );
}

export default function ClientDashboard() {
  const isWeb = Platform.OS === 'web';

  const renderGradientCard = () => (
    <View style={[styles.card, isWeb ? styles.webGradient : styles.nativeGradient]}>
      <Text style={styles.label}>TODAY REVENUE</Text>
      <AnimatedNumber
        value={3431}
        prefix="₹ "
        style={styles.amount}
      />
      <Text style={styles.small}>+12% from yesterday</Text>
    </View>
  );

  const renderIcon = (name, color) => (
    isWeb ? (
      <Ionicons name={name} size={30} color={color} />
    ) : (
      <Text style={[styles.iconFallback, { color }]}>●</Text>
    )
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.surface} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderGradientCard()}

        <View style={styles.box}>
          {renderIcon('md-medical-bag-outline', colors.primary)}
          <Text style={styles.boxText}>Total Medicines</Text>
          <Text style={styles.boxValue}>1284</Text>
        </View>

        <View style={styles.box}>
          {renderIcon('md-warning-outline', colors.error)}
          <Text style={styles.boxText}>Expiring Soon</Text>
          <Text style={styles.boxValue}>42</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  scroll: {
    padding: 16,
  },

  card: {
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
  },

  nativeGradient: {
    // Native gradient handled by LinearGradient component (commented out)
  },

  webGradient: {
    backgroundImage: 'linear-gradient(135deg, #004AC6 0%, #3B6FD4 100%)',
  },

  label: {
    color: '#fff',
    fontSize: 12,
  },

  amount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },

  small: {
    color: '#fff',
    marginTop: 10,
  },

  box: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },

  boxText: {
    marginTop: 10,
    fontSize: 16,
  },

  boxValue: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },

  iconFallback: {
    fontSize: 30,
  },
});

