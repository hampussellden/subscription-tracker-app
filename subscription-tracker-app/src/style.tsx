import { StyleSheet } from "react-native";
const darkMode = false; //subject to change
const S = StyleSheet.create({
  primaryColor: {
    backgroundColor: darkMode ? "#a67d7d" : "#9ddef8",
  },
  subTitleBold: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 24,
  },
});

export default S;
