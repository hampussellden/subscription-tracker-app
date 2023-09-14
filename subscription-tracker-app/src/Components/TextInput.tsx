import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
const styles = StyleSheet.create({
  textInput: {
    borderRadius: 4,
    backgroundColor: "'rgba(0, 0, 0, 0.25)'",
    boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.25) inset",
    padding: 10,
  },
});
const TextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <>
      <Input
        onChangeText={onChangeText}
        label={label}
        labelStyle={{ color: "black", fontSize: 16 }}
        placeholder={placeholder}
        placeholderTextColor={"rgba(0,0,0,1)"}
        value={value}
        autoCapitalize={"none"}
        style={styles.textInput}
        underlineColorAndroid='transparent'
        inputContainerStyle={{
          borderBottomWidth: 0,
          margin: 0,
          padding: 0,
        }}
      />
    </>
  );
};
export default TextInput;
