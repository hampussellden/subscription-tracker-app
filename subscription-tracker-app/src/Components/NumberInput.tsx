import React, { useContext } from "react";
import S from "../style";
import { themeContext } from "../Theme";
import { View, Text, StyleSheet, TextInput } from "react-native";
// import { Input } from "react-native-elements";

const NumberInput = ({
  onValueChange,
  index,
}: {
  onValueChange: any;
  index: number;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const handleInputChange = (value: string) => {
    const obj = { index: index, value: value };
    onValueChange(obj);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      padding: 0,
    },
    Input: {
      width: 40,
      height: 40,
      borderRadius: 4,
      backgroundColor: S.primaryColorLight.backgroundColor,
      padding: 10,
      textAlign: "center",
      shadowColor: "rgba(0,0,0, 0.25)",
      shadowOffset: { width: -1, height: -1 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType='numeric'
        maxLength={1}
        onChangeText={handleInputChange}
        style={styles.Input}
        secureTextEntry={true}
      />
    </View>
  );
};
export default NumberInput;
