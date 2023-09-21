import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const PinCodePopUp = () => {
  return <View style={styles.container}></View>;
};
export default PinCodePopUp;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "hotpink",
    zIndex: 100,
  },
});
