import React, { useEffect, useContext } from "react";
import { supabase } from "../../lib/supabase";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import NumberInput from "./NumberInput";
import S from "../style";
import { themeContext } from "../Theme";
const PinCodePopUp = ({
  profileId,
  handleUnlock,
  onPress,
}: {
  profileId: any;
  handleUnlock: any;
  onPress: any;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [correctPin, setCorrectPin] = React.useState<string | null>(null);
  const [pinCodeHolder, setPinCodeHolder] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    const fetchPinCode = async () => {
      let { data: pinCode, error } = await supabase
        .from("profiles")
        .select("pin_code")
        .eq("id", profileId);
      if (error) {
        console.log(error);
      }
      if (pinCode) {
        setCorrectPin(pinCode[0]?.pin_code);
      }
    };
    fetchPinCode();
  }, []);
  const pinCodeIsOnlyNumbers = (): boolean => {
    const pinCodeOkay = pinCodeHolder.every((element) =>
      /^[0-9]{1}$/.test(element)
    );
    return pinCodeOkay;
  };
  const createPinCode = (): string | false => {
    if (pinCodeIsOnlyNumbers()) {
      return pinCodeHolder.join("");
    }
    return false;
  };

  const handleInputChange = ({
    value,
    index,
  }: {
    value: string;
    index: number;
  }) => {
    pinCodeHolder[index] = value;
    setInputValue(value);
    if (createPinCode() == correctPin) {
      handleUnlock();
    }
  };

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: -16,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height * 1.3,
      backgroundColor: darkTheme
        ? S.backgroundTransparencyColorDark.backgroundColor
        : S.backgroundTransparencyColorLight.backgroundColor,
      zIndex: 50,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
    },
    pinCodeContainer: {
      backgroundColor: darkTheme
        ? S.onPrimaryColorDark.backgroundColor
        : S.onPrimaryColorLight.backgroundColor,
      minHeight: 76,
      minWidth: 360,
      maxWidth: 370,
      maxHeight: 124,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: 4,
      gap: 16,
      paddingHorizontal: 16,
      paddingVertical: 24,
      marginHorizontal: 16,
      marginTop: Dimensions.get("window").height / 3.5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.pinCodeContainer}>
        <Text
          style={[
            S.label,
            {
              color: darkTheme
                ? S.secondaryColorDark.color
                : S.secondaryColorLight.color,
            },
          ]}
        >
          Ange din pinkod:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            minWidth: 250,
          }}
        >
          {pinCodeHolder.map((value, i) => (
            <NumberInput key={i} index={i} onValueChange={handleInputChange} />
          ))}
        </View>
      </View>
      <Button
        title='Gå Tillbaka'
        titleStyle={{ color: "black", fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          marginTop: 20,
          maxWidth: 364,
          width: "100%",
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "#000000",
          backgroundColor: "#FFFFFF",
          alignSelf: "center",
        }}
        containerStyle={{
          width: "100%",
        }}
        // disabled={loading}
        onPress={onPress}
      />
    </View>
  );
};
export default PinCodePopUp;
