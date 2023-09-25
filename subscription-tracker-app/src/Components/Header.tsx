import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { arrowBack, gearDark, gearLight } from "../images/images";
import ArrowLeft from "../images/arrowLeft.svg";
import S from "../style";
enum Routes {
  Home = "Home",
  AddSubscription = "AddSubscription",
  Settings = "Settings",
  Family = "Family",
  SingleSubscription = "SingleSubscription",
  AddUser = "AddUser",
}
type Route = {
  name: Routes;
};
const backAbleRoutes = ["Family","Settings","AddUser"] as Routes[];

const Header = ({ activeSingleSub, navigation, closeSingle }: any) => {
  const route = useRoute() as Route;
  const currentRoute = route.name as Routes;
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: 40,
      paddingVertical: 8,
      paddingHorizontal: activeSingleSub ? 16 : 0,
      backgroundColor: activeSingleSub ? "transparent" : "inherit",
      position: activeSingleSub ? "absolute" : "relative",
      top: activeSingleSub ? 48 : 0,
      zIndex: 1,
    },
  });
  return (
    <View style={styles.container}>
      {activeSingleSub ? (
        <Pressable
          onPress={activeSingleSub ? closeSingle : () => navigation.goBack()}
        >
          <ArrowLeft height={40} width={40} color={S.onBackgroundText.color} />
        </Pressable>
      ) : backAbleRoutes.includes(currentRoute) ? (
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft height={40} width={40} color={S.onBackgroundText.color} />
        </Pressable>
      ) : (
        <View></View>
      )}
      {backAbleRoutes.includes(currentRoute) ? (
        <View></View>
      ) : (
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Image
            source={true ? gearLight : gearDark}
            style={{ width: 40, height: 40 }}
          />
        </Pressable>
      )}
    </View>
  );
};
export default Header;
