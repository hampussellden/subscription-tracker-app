import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import { rnwlLogo } from "../images/images";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={rnwlLogo} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label='Emailadress:'
          keyboardType='email-address'
          labelStyle={{ color: "black", fontSize: 22 }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='jane@doe.com'
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          autoCapitalize={"none"}
          style={styles.textInput}
          underlineColorAndroid='transparent'
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label='Lösenord:'
          labelStyle={{ color: "black", fontSize: 22 }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder='********'
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          autoCapitalize={"none"}
          style={styles.textInput}
          underlineColorAndroid='transparent'
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
      <View style={styles.row}>
        <Text>Saknar du inlogg?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Skapa Konto</Text>
        </Pressable>
      </View>
      <Button
        title='Sign in'
        titleStyle={{ color: "white", fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          marginTop: 20,
          width: "100%",
          maxWidth: 396,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 5,
          backgroundColor: "rgba(0, 0, 0, 1)",
          alignSelf: "center",
        }}
        disabled={loading}
        onPress={() => signInWithEmail()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  textInput: {
    borderRadius: 4,
    backgroundColor: "'rgba(0, 0, 0, 0.25)'",
    padding: 10,
  },
  verticallySpaced: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    width: 200,
  },
  link: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
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
