import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Keyboard,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import NumberInput from "../Components/NumberInput";
import { rnwlLogo, arrowBack } from "../images/images";

const RegisterScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");
  const pinCodeContainer: string[] = ["", "", "", "", "", ""];
  const isKeyboardVisible = Keyboard.isVisible();
  const [pinCodeHolder, setPinCodeHolder] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  async function signUp() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          fullName: fullName,
          username: username,
          pinCode: pinCode,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    }
    if (data.user?.id) {
      const userId = data.user?.id;

      const { data: update, error } = await supabase
        .from("profiles")
        .update({ username: username, full_name: fullName, pin_code: pinCode })
        .eq("id", userId);

      const { data: user } = await supabase
        .from("users")
        .insert({
          profile_id: userId,
          name: username,
        })
        .select();

      if (error) {
        console.log(error);
      }

      if (user) {
        navigation.navigate("Home", { session: data.session });
      }
    }
  }
  const createProfile = async () => {
    if (password != passwordConfirmation) {
      return;
    }
    if (createPinCode()) {
      return;
    }
    await signUp();
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
    console.log(pinCodeContainer);
  };
  const handleInputChange = ({
    value,
    index,
  }: {
    value: string;
    index: number;
  }) => {
    pinCodeHolder[index] = value;
    setPinCode(pinCodeHolder.join(""));
  };

  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 8,
      paddingBottom: isKeyboardVisible ? 100 : 8,
    },
    rowContainer: {
      flexDirection: "row",
      display: "flex",
      gap: 2,
    },
    logo: {
      height: 50,
      width: "100%",
      resizeMode: "contain",
      marginBottom: 20,
      marginTop: 20,
    },
    textInput: {
      borderRadius: 4,
      backgroundColor: "'rgba(0, 0, 0, 0.25)'",
      padding: 10,
    },
  });

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{ marginHorizontal: 16 }}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 24, marginTop: 35 }}
      >
        <Image source={arrowBack} style={{ width: 20, height: 20 }} />
      </Pressable>
      <Image style={styles.logo} source={rnwlLogo} />
      <Input
        onChangeText={setFullName}
        label='Fullständigt namn:'
        placeholder='Jane Doe'
        value={fullName}
        labelStyle={{ color: "black", fontSize: 22 }}
        placeholderTextColor={"rgba(0,0,0,0.5)"}
        autoCapitalize={"none"}
        style={styles.textInput}
        underlineColorAndroid='transparent'
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        onChangeText={setEmail}
        value={email}
        placeholder='jane@doe.com'
        label='Email:'
        labelStyle={{ color: "black", fontSize: 22 }}
        placeholderTextColor={"rgba(0,0,0,0.5)"}
        autoCapitalize={"none"}
        style={styles.textInput}
        underlineColorAndroid='transparent'
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        value={username}
        onChangeText={setUsername}
        label='Användarnamn:'
        placeholder='John'
        labelStyle={{ color: "black", fontSize: 22 }}
        placeholderTextColor={"rgba(0,0,0,0.5)"}
        autoCapitalize={"none"}
        style={styles.textInput}
        underlineColorAndroid='transparent'
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        onChangeText={setPassword}
        value={password}
        label='Lösenord:'
        secureTextEntry={true}
        placeholder='********'
        labelStyle={{ color: "black", fontSize: 22 }}
        placeholderTextColor={"rgba(0,0,0,0.5)"}
        autoCapitalize={"none"}
        style={styles.textInput}
        underlineColorAndroid='transparent'
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        onChangeText={setPasswordConfirmation}
        value={passwordConfirmation}
        label='Bekräfta lösenord:'
        secureTextEntry={true}
        placeholder='********'
        labelStyle={{ color: "black", fontSize: 22 }}
        placeholderTextColor={"rgba(0,0,0,0.5)"}
        autoCapitalize={"none"}
        style={styles.textInput}
        underlineColorAndroid='transparent'
        inputContainerStyle={{ borderBottomWidth: 0 }}
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
            <NumberInput key={i} index={i} onValueChange={handleInputChange} />
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
        loading={loading}
        onPress={createProfile}
      />
    </ScrollView>
  );
};
export default RegisterScreen;
