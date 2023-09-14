import React, { useState } from "react";
import { Alert, View, Text, StyleSheet, Image } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import NumberInput from "../Components/NumberInput";
import { rnwlLogo } from "../images/images";

const RegisterScreen = (
  {
    /* navigation */
  }
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [pinCode, setPinCode] = useState<number | null>(null);
  const pinCodeContainer: (number | null)[] = [
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  async function signUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  const createProfile = () => {
    supabase.auth.signUp({
      email: email,
      password: password,
    });
  };

  const createPinCode = (): string => {
    return pinCodeContainer.join("");
  };
  const handleNumberValue = (obj: { key: number; value: number }) => {
    pinCodeContainer[obj.key] = obj.value;
    console.log(pinCodeContainer);
    console.log(createPinCode());
  };
  return (
    <View>
      <Image style={styles.logo} source={rnwlLogo} />
      <View>
        <Text>Fullständigt Namn:</Text>
        <Input
          placeholder='Fullständigt Namn'
          onChangeText={(text: string) => setFullName(text)}
          value={fullName}
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Text>Email:</Text>
        <Input
          placeholder='Email'
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Text>Användarnamn:</Text>
        <Input
          placeholder='Användarnamn'
          onChangeText={(text: string) => setUsername(text)}
          value={username}
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Text>Lösenord:</Text>
        <Input
          placeholder='Lösenord'
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Text>Upprepa lösenord:</Text>
        <Input
          placeholder='Lösenord'
          onChangeText={(text: string) => setPassword(text)}
          value={passwordConfirmation}
          autoCapitalize={"none"}
        />
      </View>
      <View>
        <Text>Pin-kod:</Text>
        <View style={styles.rowContainer}>
          {pinCodeContainer.map((value, i) => (
            <NumberInput key={i} index={i} onValueChange={handleNumberValue} />
          ))}
        </View>
      </View>

      <Button
        title='Slutför registrering'
        style={{ width: 200 }}
        onPress={() => createProfile()}
      />
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    display: "flex",
  },
  logo: {
    height: 50,
    width: "100%",
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 20,
  },
});
