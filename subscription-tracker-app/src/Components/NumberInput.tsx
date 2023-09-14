import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const NumberInput = ({ onValueChange, index }: any) => {
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    const obj = { value: value, key: index };
    onValueChange(obj);
  };

  return (
    <View style={styles.container}>
      <Input
        keyboardType='numeric'
        maxLength={1}
        onChange={handleInputChange}
        style={styles.Input}
        secureTextEntry={true}
        inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
        containerStyle={{ padding: 0 }}
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
    boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.25) inset",
    padding: 10,
    textAlign: "center",
  },
});
