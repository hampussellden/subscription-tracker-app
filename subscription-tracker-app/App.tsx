import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import LoginScreen from "./src/Screens/LoginScreen";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "./src/Screens/AccountScreen";
import OnboardingScreen from "./OnboardingScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";

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
          // {
          // tos_accepted != true &&
          // <Stack.Screen name="onboardingScreen" component={OnboardingScreen} />
          // }
          // {
          //   // <Stack.Screen name="homeScreen" component={HomeScreen} />
          //   // <Stack.Screen name="subscriptionInfoScreen" component={SubscriptionInfoScreen} />
          //   // <Stack.Screen name="AddSubscriptionScreen" component={AddSubscriptionScreen} />
          //   // <Stack.Screen name="AppSettingsSCreen" component={AppSettingsScreen} />
          //   // <Stack.Screen name="AddNewUserScreen" component={AddNewUserScreen} />
          // }
          <>
            <Stack.Screen
              name='Onboard'
              component={OnboardingScreen}
              initialParams={{ session: session }}
            /> 

            
            <Stack.Screen
              name='Account'
              component={AccountScreen}
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
