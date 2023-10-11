import React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { colors } from "../../db";

const Header = () => {
  return (
    <View style={{ flexDirection: "row", padding: 7 }}>
      <Text style={styles.textStyle}>
        AYO PESAN UNTUK DIANTAR ATAU BAWA PULANG
      </Text>
      <View style={styles.button}>
        <Text style={{ color: "#fff" }}>Pesan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    padding: 10,
    letterSpacing: -0.5,
  },
  button: {
    backgroundColor: colors.COLOR_PRIMARY,
    padding: 10,
    width: 60,
    borderRadius: 30,
    height: 35,
    alignItems: "center",
  },
});

export default Header;
