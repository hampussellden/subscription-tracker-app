import "react-native-url-polyfill/auto";
import React, { useState, useEffect, createContext } from "react";
import { supabase } from "./lib/supabase";
import LoginScreen from "./src/Screens/LoginScreen";
import { View, StyleSheet } from "react-native";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./src/Screens/RegisterScreen";
import SettingScreen from "./src/Screens/SettingScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import FamilyScreen from "./src/Screens/FamilyScreen";
import AddUserScreen from "./src/Screens/AddUserScreen";
import AddSubscriptionScreen from "./src/Screens/AddSubscriptionScreen";
import * as Font from "expo-font";
// import { Hej } from "./src/style";
// import {themeContext} from './src/Context';
import S from "./src/style";

export const themeContext = createContext<any>({});

export default function App() {
 const [darkTheme, setDarkTheme] = useState<boolean>(false);
 const [darkTrue, setDarkTrue] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    Font.loadAsync({
      'DM_Sans_Regular': require("./assets/fonts/DMSans_18pt-Regular.ttf"),
      'DM_Sans_Bold': require("./assets/fonts/DMSans_18pt-Bold.ttf"),
      'DM_Sans_Medium': require("./assets/fonts/DMSans_18pt-Medium.ttf"),
    });
  },[]);

  

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const Stack = createNativeStackNavigator();

  console.log(darkTheme);

  return (
    <themeContext.Provider value={[darkTheme, setDarkTheme]} >
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {session && session.user ? (
          <>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              initialParams={{ session: session }}
            />
            <Stack.Screen
              name='AddSubscription'
              component={AddSubscriptionScreen}
              initialParams={{ session: session }}
            />
            <Stack.Screen
              name='Settings'
              component={SettingScreen}
              initialParams={{ session: session }}
            />
            <Stack.Screen
              name='Family'
              component={FamilyScreen}
              initialParams={{ session: session }}
            />
            <Stack.Screen
              name='AddUser'
              component={AddUserScreen}
              initialParams={{ session: session }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </themeContext.Provider>
  );
}



