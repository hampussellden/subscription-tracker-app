import { StyleSheet } from "react-native";

const darkMode = false; //subject to change
const S = StyleSheet.create({
  primaryColor: {
    backgroundColor: darkMode ? "#1f2627" : "#F5F1EC",
  },
  onPrimaryColor: {
    backgroundColor: darkMode ? "#F5F1EC" : "#1F2627",
  },
  secondaryColor: {
    backgroundColor: darkMode ? "#1F2627" : "#F5F1EC",
  },
  tertiaryColor: {
    backgroundColor: "#A9C0FF",
  },
  OnTertiary: {
    backgroundColor: darkMode ? "#F5F1EC" : "#1F2627",
  },
  backgroundTransparencyColor: {
    backgroundColor: darkMode ? "rgba(31, 38, 39, 0.8)" : "rgba(245, 241, 236, 0.8)",
  },
  iconFillColor: {
    backgroundColor: "#FFFFFF",
  },
  headingOne: {
    fontFamily: "DM_Sans",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 42,
    letterSpacing: -1.8,
  },
  headingTwo:{
    fontFamily: "DM_Sans",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 28,
    letterSpacing: -1.2,
  },
  paragraph: {
    fontFamily: "Helvetica",
    fontSize: 18,
    fontWeight: "400",
  },
  label:{
    fontFamily: "DM_Sans",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: -0.8,
  },
  brandDefaultColor: {},
  borderRadiusSmall: {
    borderRadius: 4,
  },
  borderRadiusMedium: {
    borderRadius: 8,
  },
  borderRadiusLarge: {
    borderRadius: 12,
  }
});

export default S;
