import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
// import { Input } from "react-native-elements";

const NumberInput = ({ onInputChange, index }: any) => {
  const handleInputChange = (value: string) => {
    const obj = { index: index, value: value };
    onInputChange(obj);
  };

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
    backgroundColor: "'rgba(0, 0, 0, 0.25)'",
    // boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.25) inset",
    padding: 10,
    textAlign: "center",
  },
});
