import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import { Input } from "react-native-elements";

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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label='Email'
          rightIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize={"none"}
          style={styles.textInput}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label='Password'
          rightIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder='Password'
          autoCapitalize={"none"}
          style={styles.textInput}
        />
      </View>
      <View style={styles.row}>
        <Text>Saknar du inlogg?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Skapa Konto</Text>
        </Pressable>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title='Sign in'
          style={{ width: 200 }}
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  textInput: {
    borderRadius: 1,
    borderColor: "black",
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
});
