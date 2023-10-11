import { View, Text, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Categories from "../components/Categories";
import { colors, images } from "../../db";
import Banner from "../components/Banner";
import Services from "../components/Services";
import { ScrollView } from "react-native";
import Products from "../components/Products";

const Home = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header headerText={"Hallo!"} />

          <View style={{ marginTop: 20 }}>
            <Banner />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              HARI INI LAPAR? AYO PESAN
            </Text>
            <Services />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
            <Categories />
          </View>

          <View style={{ marginTop: 20 }}>
            <Products />
          </View>
          
          
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
