import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import {  colors } from "../../db";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native-paper";

const GET_CATEGORIES = gql`
  query Query {
    findAllCategories {
      name
    }
  }
`;

const Categories = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading)
    return <ActivityIndicator size="large" color={colors.COLOR_PRIMARY} />;
  if (error) return <p>Error : {error.message}</p>;

  const categories = data.findAllCategories
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((e, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor:
                  index === 0 ? colors.COLOR_PRIMARY : colors.COLOR_LIGHT,
                marginRight: 36,
                borderRadius: 4,
                paddingHorizontal: 16,
                paddingVertical: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 7,
                marginVertical: 16,
              }}
            >
              <Text
                style={{
                  color: index === 0 && colors.COLOR_LIGHT,
                  fontSize: 18,
                }}
              >
                {e.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Categories;
