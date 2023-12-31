import { StyleSheet } from "react-native";

const darkMode = true; //subject to change
const S = StyleSheet.create({
  primaryColor: {
    backgroundColor: darkMode ? "#1f2627" : "#F5F1EC",
  },
  primaryColorLight: {
    backgroundColor: "#F5F1EC",
  },
  primaryColorDark: {
    backgroundColor: "#1f2627",
  },
  onPrimaryColor: {
    backgroundColor: darkMode ? "#F5F1EC" : "#1F2627",
    color: darkMode ? "#F5F1EC" : "#1F2627",
  },
  onPrimaryColorLight: {
    backgroundColor: "#1F2627",
    color: "#1F2627",
  },
  onPrimaryColorDark: {
    backgroundColor: "#F5F1EC",
    color: "#F5F1EC",
  },
  secondaryColor: {
    backgroundColor: darkMode ? "#1F2627" : "#F5F1EC",
    color: darkMode ? "#1F2627" : "#F5F1EC",
  },
  secondaryColorLight: {
    backgroundColor: "#F5F1EC",
    color: "#F5F1EC",
  },
  secondaryColorDark: {
    backgroundColor: "#1F2627",
    color: "#1F2627",
  },
  tertiaryColor: {
    backgroundColor: "#A9C0FF",
    color: "#A9C0FF",
  },
  OnTertiary: {
    color: darkMode ? "#F5F1EC" : "#1F2627",
  },
  onTertiaryLight: {
    backgroundColor: "#1F2627",
    color: "#1F2627",
  },
  onTertiaryDark: {
    backgroundColor: "#F5F1EC",
    color: "#F5F1EC",
  },

  backgroundTransparencyColor: {
    backgroundColor: darkMode
      ? "rgba(31, 38, 39, 0.8)"
      : "rgba(245, 241, 236, 0.8)",
    color: darkMode ? "#1F2627" : "#F5F1EC",
  },

  backgroundTransparencyColorLight: {
    backgroundColor: "rgba(245, 241, 236, 0.8)",
    color: "#F5F1EC",
  },
  backgroundTransparencyColorDark: {
    backgroundColor: "rgba(31, 38, 39, 0.8)",
    color: "#1F2627",
  },

  iconFillColor: {
    backgroundColor: "#FFFFFF",
  },
  headingOne: {
    fontFamily: "DM_Sans_Bold",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 42,
    letterSpacing: -1.8,
  },
  headingTwo: {
    fontFamily: "DM_Sans_Medium",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 28,
    letterSpacing: -1.2,
  },
  headingThree: {
    fontFamily: "DM_Sans_Regular",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 30,
  },
  paragraph: {
    fontFamily: "Helvetica",
    fontSize: 18,
    fontWeight: "400",
  },
  label: {
    fontFamily: "DM_Sans_Regular",
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
  },
  onBackgroundText: {
    color: darkMode ? "white" : "black",
    marginBottom: 18,
  },
  onBackgroundTextLight: {
    color: "black",
    marginBottom: 18,
  },
  onBackgroundTextDark: {
    color: "white",
    marginBottom: 18,
  },
  textLight: {
    color: "white",
  },
  textDark: {
    color: "black",
  },
  textTertiaryColor: {
    color: "#A9C0FF"
  },

});

export default S;
