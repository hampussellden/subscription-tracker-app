import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { addDark, addLight } from "../images/images";
import S from "../style";
const AddSubscriptionFooter = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("AddSubscription")}>
        <Image
          source={false ? addDark : addLight}
          style={{ height: 60, width: 60 }}
        />
      </Pressable>
    </View>
  );
};
export default AddSubscriptionFooter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: S.primaryColor.backgroundColor,
    height: 60,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 120,
  },
});
