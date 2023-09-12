import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import LoginScreen from "./src/Screens/LoginScreen";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AccountScreen from "./src/Screens/AccountScreen";


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
    <View>
    <NavigationContainer>
      <Stack.Navigator>
      {session && session.user ? (
        <AccountScreen key={session.user.id} session={session} />
        ) : (
            <LoginScreen />
          // <Stack.Screen
          // name="AccountScreen"
          // component={AccountScreen}
          // options={{title: 'Welcome'}}
          // />
          )}
          </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}
