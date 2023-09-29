import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Button } from "react-native-elements";
import React, { useState, useContext } from "react";
import { gangplankProfile } from "../images/images";
import ArrowRight from "../images/arrowRight.svg";
import { supabase } from "../../lib/supabase";
import CookiepopUp from "../Components/CookiepopUp";
import TosService from "../Components/TosService";
import GdprPopUp from "../Components/GdprPopUp";
import Header from "../Components/Header";
import S from "../style";
import Ts from "../testStyle";
import { themeContext } from "../Theme";
import Notification from "../Components/Notification";
import { schedulePushNotification } from "../Components/Notification";
import { registerForPushNotificationsAsync } from "../Components/Notification";

const SettingScreen = (props: any) => {
  const session = props.route.params.session;

  const [darkModeenabled, setDarkModeEnabled] = useState(false);
  const [notificationEnabled, setNotificationEnabled] =
    useState<boolean>(false);
  const [viewCookies, setViewCookies] = useState(false);
  const [viewTos, setViewTos] = useState(false);
  const [viewGdpr, setViewGdpr] = useState(false);
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const [notification, setNotification] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const toggleNotificationEnabled = () => {
    setNotificationEnabled((previousState) => !previousState);
  };

  const updateNotification = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ global_notifications_on: true })
      .eq("id", session?.user.id);

    if (error) {
      console.log(error);
    }
  };

  const noNotificationsUpdate = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ global_notifications_on: false })
      .eq("id", session?.user.id);

    if (error) {
      console.log(error);
    }
  };

  notificationEnabled && updateNotification();
  !notificationEnabled && noNotificationsUpdate();

  const toggleDarkModeSwitch = () => {
    setDarkTheme((darkTheme: any) => !darkTheme);
  };

  const handleCookies = () => {
    setViewCookies(false);
    setScrollEnabled(true);
  };
  const handleCookiePress = () => {
    setViewCookies(true);
    setScrollEnabled(false);
  };

  const handleTos = () => {
    setViewTos(false);
    setScrollEnabled(true);
  };

  const handleTosPress = () => {
    setViewTos(true);
    setScrollEnabled(false);
  }

  const handleGdpr = () => {
    setViewGdpr(false);
    setScrollEnabled(true);
  };

  const handleGdprPress = () => {
    setViewTos(true);
    setScrollEnabled(false);
  }

  const sendNotification = () => {
    if (notificationEnabled) {
      schedulePushNotification();
    } else {
      Alert.alert(
        "För att få notifikationer måste du  växla notifikations knappen"
      );
    }
  };

  console.log(scrollEnabled);

  return (
    <View
      style={[
        styles.settingsScreenWrapper,
        darkTheme ? S.primaryColorDark : S.primaryColorLight,
        { paddingBottom: 60 },
      ]}
    >
      {notification && <Notification />}
      {viewCookies && <CookiepopUp onClick={handleCookies} />}
      {viewTos && <TosService onClick={handleTos} />}
      {viewGdpr && <GdprPopUp onClick={handleGdpr} />}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        scrollEnabled={scrollEnabled}
      >
        <Header navigation={props.navigation} />

        <Text
          style={[
            S.headingOne,
            darkTheme ? S.onBackgroundTextDark : S.onBackgroundTextLight,
          ]}
        >
          Inställningar
        </Text>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImg} source={gangplankProfile} />
        </View>
        <View style={styles.alternativSection}>
          <View style={styles.switchSection}>
            <View style={styles.darkModeAlt}>
              <Text
                style={[S.headingTwo, darkTheme ? S.textLight : S.textDark]}
              >
                Mörkt läge
              </Text>
              <Switch
                trackColor={{ false: "#1f2627", true: "#1f2627" }}
                thumbColor={darkTheme ? "#A9C0FF" : "#f4f3f4"}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleDarkModeSwitch}
                value={darkTheme}
              />
            </View>
            <View style={styles.notifikationAlt}>
              <Text
                style={[S.headingTwo, darkTheme ? S.textLight : S.textDark]}
              >
                Tillåt notifikationer
              </Text>
              <Button
                title='Testa'
                titleStyle={{
                  color: darkTheme ? S.textDark.color : S.textLight.color,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
                buttonStyle={{
                  width: 50,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: darkTheme
                    ? S.primaryColorLight.backgroundColor
                    : S.primaryColorDark.backgroundColor,
                }}
                onPress={sendNotification}
              />
              <Switch
                trackColor={{ false: "#1f2627", true: "#1f2627" }}
                thumbColor={notificationEnabled ? "#A9C0FF" : "#f4f3f4"}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleNotificationEnabled}
                value={notificationEnabled}
              />
            </View>
            <View style={styles.familyAlt}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Family")}
              >
                <Text
                  style={[S.headingTwo, darkTheme ? S.textLight : S.textDark]}
                >
                  Familjehantering
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Family")}
              >
                <ArrowRight
                  width={40}
                  height={40}
                  color={darkTheme ? S.textLight.color : S.textDark.color}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.DataAlt}>
            <Text
              style={[
                S.headingTwo,
                darkTheme ? S.onBackgroundTextDark : S.onBackgroundTextLight,
              ]}
            >
              Integritet och data
            </Text>
            <TouchableOpacity onPress={handleCookiePress}>
              <Text style={[S.label, darkTheme ? S.textLight : S.textDark]}>
                Cookies
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTosPress}>
              <Text style={[S.label, darkTheme ? S.textLight : S.textDark]}>
                Användarvillkor & integritetspolicy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGdprPress}>
              <Text style={[S.label, darkTheme ? S.textLight : S.textDark]}>
                GDPR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[S.label, darkTheme ? S.textLight : S.textDark]}>
                Radera konto
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            title='Logga ut'
            titleStyle={[
              S.headingTwo,
              darkTheme ? S.textTertiaryColor : S.textLight,
            ]}
            buttonStyle={{
              alignSelf: "center",
              width: "100%",
              maxWidth: 396,
              paddingHorizontal: 24,
              paddingVertical: 16,
              borderRadius: 5,
              backgroundColor: darkTheme
                ? Ts.primaryLight.backgroundColor
                : Ts.primaryDark.backgroundColor,
            }}
            onPress={() => supabase.auth.signOut()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  settingsScreenWrapper: {
    paddingTop: 48,
    flex: 1,
    gap: 10,
    paddingRight: 5,
    paddingLeft: 5,
  },
  h1: {
    fontSize: 36,
  },
  profileContainer: {
    flexDirection: "row",
    height: 262.4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  alternativSection: {
    height: 420.8,
    width: "100%",
    justifyContent: "space-between",
    alignContent: "flex-start",
    // backgroundColor: 'green',
    flexDirection: "column",
  },
  switchSection: {
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    gap: 10,
  },

  darkModeAlt: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notifikationAlt: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  altText: {
    fontSize: 24,
  },
  familyAlt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
  DataAlt: {
    justifyContent: "space-between",
    width: "100%",
    height: "auto",
    gap: 10,
  },
});
