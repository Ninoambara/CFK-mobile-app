import React from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { bannerImage } from "../../db";

const Banner = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          {bannerImage.map((e,i) => {
            return (
              <View key={i} style={styles.bannerHome}>
                <Image
                  source={{
                    uri: `${e}`,
                  }}
                  style={{ flex: 1 }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerHome: {
    width: 300,
    height: 150,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 10,
    overflow: "hidden"
  },
});

export default Banner;
