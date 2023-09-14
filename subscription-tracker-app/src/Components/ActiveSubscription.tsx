import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { arrowBack } from "../images/images";
const ActiveSubscription = ({ service }: any) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 160,
      paddingHorizontal: 8,
      paddingVertical: 16,
      borderRadius: 5,
      backgroundColor: service.color,
      maxWidth: 241,
      maxHeight: 262,
    },
    topRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    bottomRow: {},
  });
  return (
    <Pressable style={[styles.container]}>
      <View style={styles.topRow}>
        <Image source={arrowBack} />
        <Image source={arrowBack} />
      </View>
      <View style={styles.bottomRow}>
        <Text>{service.name}</Text>
      </View>
    </Pressable>
  );
};
export default ActiveSubscription;
