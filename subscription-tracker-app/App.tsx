import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import LoginScreen from "./src/Screens/LoginScreen";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "./src/Screens/AccountScreen";
import OnboardingScreen from "./src/Screens/OnboardingScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import SettingScreen from "./src/Screens/SettingScreen";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [tosAccepted, setTosAccepted] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // useEffect(() => {
  //   const fetchTos = async () => {
  //     if(session) {
  //       const {data: tos} = await supabase
  //       .from('profiles')
  //       .select('tos_accepted')
  //       .eq('id',session.user.id )
  
        
  //       console.log(tos);
        
  //       if(tos) {
  //           const tosAccepted = tos[0].tos_accepted as boolean;
  //           setTosAccepted(tosAccepted);
  //       }
  //     }
  //   }
  //   fetchTos()
  // }, [])

  // console.log(tosAccepted);

  // console.log(session?.user);
  
  

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
          name='Settings'
          component={SettingScreen}
          initialParams={{session: session}}
          />
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
