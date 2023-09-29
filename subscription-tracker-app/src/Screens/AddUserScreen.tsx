import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Input, Button } from "react-native-elements";
import React, { useState, useContext } from "react";
import { testUser, penIcon } from "../images/images";
import { supabase } from "../../lib/supabase";
import S from "../style";
import Header from "../Components/Header";
import { themeContext } from "../Theme";

const AddUserScreen = (props: any) => {
  const [text, setText] = useState<string>("");
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);

  const session = props.route.params.session;

  const addUser = async () => {
    const { error, data } = await supabase
      .from("users")
      .insert({
        name: text,
        avatar_url: "portrait1.jpeg",
        profile_id: session?.user.id,
      })
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      Alert.alert("user Created succesfully");
      props.navigation.goBack();
    }
  };

  const styles = StyleSheet.create({
    addUserScreenWrapper: {
      height: "100%",
      width: "100%",
      // justifyContent: "space-around",
      paddingHorizontal: 16,
      paddingVertical: 48,
      backgroundColor: darkTheme
        ? S.primaryColorDark.backgroundColor
        : S.primaryColorLight.backgroundColor,
    },
    h1: {
      fontSize: 36,
    },
    userContainer: {
      width: "100%",
      height: 354,
      // backgroundColor: 'cornflowerblue',
      justifyContent: "center",
      alignItems: "center",
    },
    userImage: {
      height: 248,
      width: 248,
    },
    imageContainer: {
      position: "relative",
    },
    penContainer: {
      height: 50,
      width: 50,
      position: "absolute",
      bottom: 17,
      right: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 50,
    },
    textInput: {
      borderRadius: S.borderRadiusSmall.borderRadius,
      backgroundColor: darkTheme
        ? S.primaryColorLight.backgroundColor
        : S.primaryColorDark.backgroundColor,
      padding: 10,
    },
  });

  return (
    <ScrollView
      style={styles.addUserScreenWrapper}
      contentContainerStyle={{ gap: 16 }}
    >
      <Header navigation={props.navigation} />
      <Text style={[S.headingOne, darkTheme ? S.textLight : S.textDark]}>
        Lägg till användare
      </Text>
      <View style={styles.userContainer}>
        <ImageBackground
          source={testUser}
          resizeMode='cover'
          imageStyle={{ borderRadius: 200 }}
        >
          <TouchableOpacity style={styles.userImage}>
            <View style={styles.penContainer}>
              <Image source={penIcon} />
            </View>
          </TouchableOpacity>
        </ImageBackground>
        {/* <Image style={styles.userImage} source={testUser}/> */}
        <Input
          label='Användarnamn:'
          labelStyle={[S.headingTwo, darkTheme ? S.textLight : S.textDark]}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder='jane'
          placeholderTextColor={darkTheme ? S.tertiaryColor.color : S.textLight.color}
          autoCapitalize={"none"}
          inputStyle={{ color: darkTheme ? "black" : "white" }}
          style={styles.textInput}
          underlineColorAndroid='transparent'
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Button
          title='Lägg till användare'
          titleStyle={{
            color: darkTheme ? S.tertiaryColor.color : S.textLight.color,
            fontWeight: "bold",
            fontSize: 24,
          }}
          buttonStyle={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 396,
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 5,
            backgroundColor: darkTheme
              ? S.primaryColorLight.backgroundColor
              : S.primaryColorDark.backgroundColor,
          }}
          onPress={addUser}
        />
        <Button
          title='Gå tillbacka'
          titleStyle={{
            color: darkTheme ? S.textLight.color : S.textDark.color,
            fontWeight: "bold",
            fontSize: 24,
          }}
          buttonStyle={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 396,
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderWidth: 2,
            borderColor: darkTheme ? S.textLight.color : S.textDark.color,
            borderRadius: 5,
            backgroundColor: darkTheme
              ? S.primaryColorDark.backgroundColor
              : S.primaryColorLight.backgroundColor,
          }}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
};

export default AddUserScreen;
