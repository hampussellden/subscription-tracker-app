import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import {
  onBoardingOne,
  onBoardingTwo,
  onBoardingThree,
} from "./src/images/images";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/Screens/LoginScreen";

function OnboardingScreen(props: any) {
  const [tosAccepted, setTosAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchTos = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("tos_accepted")
        .eq("id", session?.user.id);

      if (data) {
        setTosAccepted(data[0].tos_accepted);
      }

      if (error) {
        console.log(error);
      }
    };

    fetchTos();
  });
  const session = props.route.params.session;

  // const session = props.route.params.session;

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  if (count > 2) {
    setCount(2);
  }

  const decrement = () => {
    setCount(count - 1);
  };

  if (count < 0) {
    setCount(0);
  }

  const handlePress = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ tos_accepted: true })
      .eq("id", session.user.id);

    if (error) {
      console.log(error);
    }

    Alert.alert("Terms accepted");

    props.navigation.navigate("Account");
  };

  if (tosAccepted) {
    props.navigation.navigate("Account");
  }

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        {count <= 0 && <Image source={onBoardingOne} />}
        {count == 1 && <Image source={onBoardingTwo} />}
        {count >= 2 && <Image source={onBoardingThree} />}
      </View>
      <View style={styles.textContainer}>
        {count <= 0 && (
          <>
            <Text style={styles.h1}>Välkommen</Text>
            <Text style={styles.p}>
              Välkommen till RNWL! Vi är glada att du är här. Med vår app kan du
              enkelt hantera alla dina prenumerationer och få en klar översikt
              över dina utgifter. Låt oss ta dig genom hur du kommer igång
            </Text>
          </>
        )}

        {count == 1 && (
          <>
            <Text style={styles.h1}>Hur börjar man?</Text>
            <Text style={styles.p}>
              Nu är det dags att börja organisera dina prenumerationer. Tryck på
              knappen "Lägg till prenumeration" och fyll i detaljerna för varje
              prenumeration du har. Vi hjälper dig att hålla koll på
              förfallodatum och kostnader.
            </Text>
          </>
        )}

        {count >= 2 && (
          <>
            <Text style={styles.h1}>Nu kör vi!</Text>
            <Text style={styles.p}>
              Nu när du har lagt till dina prenumerationer, kan du se en tydlig
              översikt över dina utgifter. RNWL hjälper dig att hålla koll på
              din budget och föreslår sätt att spara pengar. Låt oss tillsammans
              förbättra din ekonomiska situation! Lycka till med din
              onboarding-process! Om du har några frågor, tveka inte att
              kontakta vår support.
            </Text>

            <Button
              title='Starta'
              titleStyle={{ color: "white", fontWeight: "bold", fontSize: 24 }}
              buttonStyle={{
                alignSelf: "center",
                width: "100%",
                maxWidth: 396,
                paddingHorizontal: 24,
                paddingVertical: 16,
                borderRadius: 5,
                backgroundColor: "rgba(0, 0, 0, 1)",
                // marginTop: 28,
                // marginBottom: 48,
              }}
              onPress={() => handlePress()}
            />
          </>
        )}
      </View>
      <View style={count < 2 ? styles.navContainer : styles.navContainerLast}>
        <TouchableOpacity onPress={decrement}>
          <Text style={styles.p}>L</Text>
        </TouchableOpacity>
        <View
          style={count <= 0 ? styles.indicatorActive : styles.indicator}
        ></View>
        <View
          style={count == 1 ? styles.indicatorActive : styles.indicator}
        ></View>
        <View
          style={count >= 2 ? styles.indicatorActive : styles.indicator}
        ></View>
        <TouchableOpacity onPress={increment}>
          <Text style={styles.p}>R</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    height: "100%",
    flexDirection: "column",
    // justifyContent: 'space-between'
  },
  header: {
    height: 392,
    width: 428,
  },
  image: {
    height: "auto",
    width: "100%",
  },
  textContainer: {
    padding: 10,
  },
  h1: {
    fontSize: 32,
    marginTop: 10,
    marginBottom: 20,
  },
  p: {
    fontSize: 18,
  },
  navContainer: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    // backgroundColor: 'blue',
    marginTop: 110,
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  navContainerLast: {
    marginTop: 0,
    flexDirection: "row",
    width: "100%",
    height: 55,
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  indicator: {
    height: 20,
    width: 20,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  indicatorActive: {
    height: 20,
    width: 20,
    borderRadius: 5,
    backgroundColor: "black",
  },
  arrow: {},
});

export default OnboardingScreen;
