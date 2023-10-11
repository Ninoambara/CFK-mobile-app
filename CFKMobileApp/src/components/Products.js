import React from "react";
import { ActivityIndicator, Image } from "react-native";
import { StyleSheet } from "react-native";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { colors } from "../../db";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

const GET_ITEMS = gql`
  query FindAllCategories {
    findAllItems {
      name
      imgUrl
      id
      description
      categoryId
      price
    }
  }
`;

const Products = () => {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading)
    return <ActivityIndicator size="large" color={colors.COLOR_PRIMARY} />;
  if (error) return <p>Error : {error.message}</p>;

  const items = data.findAllItems;
  return (
    <View>
      {items.map((e, index) => {
        return (
          <Pressable
            key={index}
            style={styles.container}
            onPress={() => navigation.navigate("Detail", { itemId: e.id })}
          >
            <View>
              <Image
                source={{
                  uri: `${e.imgUrl}`,
                }}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <View style={{ marginLeft: 10, justifyContent: "space-between" }}>
              <Text style={{ fontWeight: "bold" }}>{e.name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>RP.100.000</Text>
                <View style={{ alignSelf: "flex-end" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Welcome")}
                    style={{
                      backgroundColor: colors.COLOR_PRIMARY,
                      borderRadius: 18,
                      paddingVertical: 6,
                      width: 80,
                      alignItems: "center",
                      alignSelf: "flex-end",
                      marginLeft: 100,
                    }}
                  >
                    <Text style={{ color: "white" }}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    padding: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});

export default Products;
