import React from "react";
import { StyleSheet } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { Text, View, ScrollView, Image } from "react-native";
import { colors } from "../../db";

const Services = () => {
  return (
    <View>
      <ScrollView style={{ padding: 16 }} horizontal>
        <View style={styles.services}>
          <View style={styles.cardServices}>
            <MaterialIcons
              name="delivery-dining"
              size={50}
              color={colors.COLOR_PRIMARY}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Delivery</Text>
          </View>
        </View>
        <View style={styles.services}>
          <View style={styles.cardServices}>
            <Ionicons name="fast-food" size={50} color={colors.COLOR_PRIMARY} />
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Dine in</Text>
          </View>
        </View>
        <View style={styles.services}>
          <View style={styles.cardServices}>
            <Feather
              name="shopping-bag"
              size={50}
              color={colors.COLOR_PRIMARY}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Takeaway</Text>
          </View>
        </View>
        <View style={styles.services}>
          <View style={styles.cardServices}>
            <MaterialIcons
              name="directions-car"
              size={50}
              color={colors.COLOR_PRIMARY}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Drivethru</Text>
          </View>
        </View>
        <View style={styles.services}>
          <View style={styles.cardServices}>
            <FontAwesome
              name="birthday-cake"
              size={50}
              color={colors.COLOR_PRIMARY}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Birthday</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  services: {
    width: 90,
    height: 110,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginRight: 20,
  },
  cardServices: { padding: 10, justifyContent: "center", alignItems: "center" },
});

export default Services;
