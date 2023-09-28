import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import {
  addSolidBlack,
  addLightBlack,
  addSolidWhite,
  addLightWhite,
} from "../images/images";
import S from "../style";
import { User } from "../types";
import { themeContext } from "../Theme";

const AddSubscriptionFooter = ({
  navigation,
  users,
}: {
  navigation: any;
  users: User[];
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkTheme
        ? S.primaryColorDark.backgroundColor
        : S.primaryColorLight.backgroundColor,
      height: 60,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 60,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("AddSubscription", { users: users })}
      >
        <Image
          source={darkTheme ? addSolidWhite : addSolidBlack}
          style={{ height: 60, width: 60 }}
        />
      </Pressable>
    </View>
  );
};
export default AddSubscriptionFooter;
