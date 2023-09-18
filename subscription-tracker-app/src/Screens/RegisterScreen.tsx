import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import NumberInput from "../Components/NumberInput";
import { rnwlLogo, arrowBack } from "../images/images";
import TextInput from "../Components/TextInput";

const RegisterScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");
  const pinCodeContainer: string[] = ["", "", "", "", "", ""];
  async function signUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  const createProfile = (): boolean => {
    if (password != passwordConfirmation) {
      return false;
    }
    if (typeof createPinCode() != "string") {
      return false;
    }
    return true;
  };

  const pinCodeIsOnlyNumbers = (): boolean => {
    const pinCodeOkay = pinCodeContainer.every((element) =>
      /^[0-9]{1}$/.test(element)
    );
    return pinCodeOkay;
  };

  const createPinCode = (): string | false => {
    if (pinCodeIsOnlyNumbers()) {
      return pinCodeContainer.join("");
    }
    return false;
  };
  const handleNumberValue = (obj: { key: number; value: string }) => {
    pinCodeContainer[obj.key] = obj.value;
  };
  return (
    <ScrollView style={{ marginHorizontal: 6, marginVertical: 8 }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 24, marginTop: 35 }}
      >
        <Image source={arrowBack} style={{ width: 20, height: 20 }} />
      </Pressable>
      <Image style={styles.logo} source={rnwlLogo} />
      <TextInput
        onChangeText={(text: string) => setFullName(text)}
        label='Fullständigt namn:'
        placeholder='Jane Doe'
        value={fullName}
      />
      <TextInput
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        placeholder='jane@doe.com'
        label='Email'
      />
      <TextInput
        value={username}
        onChangeText={(text: string) => setUsername(text)}
        label='Användarnamn:'
        placeholder='username123'
      />
      <TextInput
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        label='Lösenord:'
        placeholder='Lösenord'
      />
      <TextInput
        onChangeText={(text: string) => setPasswordConfirmation(text)}
        value={passwordConfirmation}
        label='Bekräfta lösenord:'
        placeholder='Lösenord'
      />
      <View style={{ gap: 16 }}>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Pin-kod:
        </Text>
        <View style={styles.rowContainer}>
          {pinCodeContainer.map((value, i) => (
            <NumberInput key={i} index={i} onValueChange={handleNumberValue} />
          ))}
        </View>
      </View>

      <Button
        title='Slutför registrering'
        titleStyle={{ color: "white", fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          alignSelf: "center",
          width: "100%",
          maxWidth: 396,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 5,
          backgroundColor: "rgba(0, 0, 0, 1)",
          marginTop: 28,
          marginBottom: 48,
        }}
        onPress={() => createProfile()}
      />
    </ScrollView>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    display: "flex",
    gap: 4,
  },
  logo: {
    height: 50,
    width: "100%",
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 20,
  },
});
