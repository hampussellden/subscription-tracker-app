import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { arrowBack, gearDark, gearLight } from "../images/images";
const darkMode = false;
const gearIcon = darkMode ? gearLight : gearDark;
enum Routes {
  Home = "Home",
  AddSubscription = "AddSubscription",
  Settings = "Settings",
  Family = "Family",
  SingleSubscription = "SingleSubscription",
}
type Route = {
  name: Routes;
};

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
          <Image
            source={arrowBack}
            style={{ width: 24, height: 24, padding: 16 }}
          />
        </Pressable>
      ) : currentRoute === "Family" || currentRoute === "Settings" ? (
        <Pressable
          onPress={() => navigation.goBack()}
        >
          <Image
            source={arrowBack}
            style={{ width: 24, height: 24, padding: 16 }}
          />
        </Pressable>
      ) : (
        <View></View>
      )}
      {currentRoute === "Family" || currentRoute === "Settings" ? (
        <View></View>
      ) : (
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Image source={gearIcon} style={{ width: 40, height: 40 }} />
        </Pressable>
      )}
    </View>
  );
};
export default Header;
