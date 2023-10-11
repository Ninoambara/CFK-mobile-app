import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#C8102E" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={{
              uri: "https://files.kfcku.com/uploads/media/food-menu/spesial/thumbnail/kfc-web_9pc-bucket-_t.png",
            }}
            style={{ marginTop: 100, width: 300, height: 300 }}
          />
          <Image
            source={{
              uri: "https://i.ibb.co/YRkcCGb/M3fd-QKM-400x400-removebg-preview.png",
            }}
            style={{ width: 300, height: 200 }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              backgroundColor: "#f96163",
              marginTop: 100,
              borderRadius: 18,
              paddingVertical: 18,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
              Let's Go
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default WelcomeScreen;
