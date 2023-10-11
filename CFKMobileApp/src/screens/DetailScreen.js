import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { gql, useQuery } from "@apollo/client";
import { colors } from "../../db";

const GET_ITEM_BY_ID = gql`
  query FindAllCategories($findItemByIdId: String!) {
    findItemByID(id: $findItemByIdId) {
      Ingredients {
        name
      }
      Category {
        name
      }
      description
      id
      imgUrl
      name
      user {
        username
      }
      price
    }
  }
`;

const DetailScreen = ({ navigation, route }) => {
  const { itemId } = route.params;

  const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
    variables: {
      findItemByIdId: itemId,
    },
  });

  if (loading)
    return <ActivityIndicator size="large" color={colors.COLOR_DARK} />;
  if (error) {
    return <Text>Error : {error.message}</Text>;
  }

  const item = data.findItemByID;
  return (
    <View style={{ backgroundColor: colors.COLOR_PRIMARY, flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flexDirection: "row", marginHorizontal: 16 }}>
          <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
            <FontAwesome name={"arrow-circle-left"} size={28} color="white" />
          </Pressable>

          <FontAwesome name={"heart-o"} size={28} color="white" />
        </SafeAreaView>
      </SafeAreaProvider>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 2,
          marginTop: 0,
          borderTopLeftRadius: 56,
          borderTopRightRadius: 56,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            height: 300,
            width: 300,
            position: "absolute",
            top: -150,
          }}
        >
          <Image
            source={{ uri: item.imgUrl }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>

        <Text style={{ marginTop: 130, fontSize: 28, fontWeight: "bold" }}>
          {item.name}
        </Text>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, marginVertical: 16, width: 350 }}>
            {item.description}
            {/* ini adalah paket keluarga yang sangat disukai oleh keaurjefjniwj */}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.38)",
                paddingVertical: 26,
                borderRadius: 8,
                alignItems: "center",
                width: 100,
              }}
            >
              <Text style={{ fontSize: 40 }}>😋</Text>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                {item.Category.name}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(135, 206, 235, 0.8)",
                paddingVertical: 26,
                borderRadius: 8,
                alignItems: "center",
                width: 100,
              }}
            >
              <Text style={{ fontSize: 40 }}>🧑</Text>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                {item.user.username}{" "}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(255, 165, 0, 0.48)",
                paddingVertical: 26,
                borderRadius: 8,
                alignItems: "center",
                width: 100,
              }}
            >
              <Text style={{ fontSize: 40 }}>💵</Text>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                {item.price}
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
            <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 6 }}>
              Ingredients:
            </Text>

            {item.Ingredients.map((ingredient, index) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 4,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      backgroundColor: "red",
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                    }}
                  ></View>
                  <Text style={{ fontSize: 18, marginLeft: 6 }}>
                    {ingredient.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailScreen;
