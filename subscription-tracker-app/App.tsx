import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import LoginScreen from "./src/Screens/LoginScreen";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./src/Screens/RegisterScreen";
import SettingScreen from "./src/Screens/SettingScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import FamilyScreen from "./src/Screens/FamilyScreen";
import AddUserScreen from "./src/Screens/AddUserScreen";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? (
          <>

            <Stack.Screen
              name='Settings'
              component={SettingScreen}
              initialParams={{ session: session }}
            />
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              initialParams={{ session: session }}
            />

        

            <Stack.Screen
              name='Family'
              component={FamilyScreen}
              initialParams={{ session: session }}
            />

            <Stack.Screen
              name='addUser'
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
  );
}
