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
      />
    </View>
  );
};
export default NumberInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  Input: {
    width: 40,
  },
});
