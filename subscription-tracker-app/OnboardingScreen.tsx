import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Alert, Button, Text, Image, TouchableOpacity } from "react-native";
import { onBoardingOne, onBoardingTwo, onBoardingThree } from './src/images/images';
import { supabase } from './lib/supabase';
import { Session } from "@supabase/supabase-js";

function OnboardingScreen(props: any) {
  // const [session, setSession] = useState<Session | null>(null);

  // const session = props.route.params.session;

  // useEffect(() => {
  //   if (session) getProfile();
  //   console.log("session", session);
  // }, [session]);
  const session = props.route.params.session;

  console.log( session.user.id);
  



  // const session = props.route.params.session;

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1)
  }

  if (count > 2) {
    setCount(2)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  if (count < 0) {
    setCount(0)
  }

  const handlePress = async () => {
    const {error} = await supabase
    .from('profiles')
    .update({tos_accepted: true} )
    .eq('id', session.user.id)

    if(error) {
      console.log(error);
    }

    Alert.alert('Terms accepted')
  }

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.header}>
        { count <= 0 && <Image  source={onBoardingOne} />}
        { count == 1 && <Image  source={onBoardingTwo} />}
        { count >= 2 && <Image  source={onBoardingThree} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.h1}>Välkommen!</Text>
        {count <= 0 && <Text>Välkommen till [Appens Namn]! Vi är glada att du är här. Med vår app kan du enkelt hantera alla dina prenumerationer och få en klar översikt över dina utgifter. Låt oss ta dig genom hur du kommer igång</Text>}

        {count == 1 && <Text>Nu är det dags att börja organisera dina prenumerationer. Tryck på knappen "Lägg till prenumeration" och fyll i detaljerna för varje prenumeration du har. Vi hjälper dig att hålla koll på förfallodatum och kostnader.</Text>
        }

        {count >= 2 && <>
        <Text>Nu när du har lagt till dina prenumerationer, kan du se en tydlig översikt över dina utgifter. [Appens Namn] hjälper dig att hålla koll på din budget och föreslår sätt att spara pengar. Låt oss tillsammans förbättra din ekonomiska situation! Lycka till med din onboarding-process! Om du har några frågor, tveka inte att kontakta vår support.</Text>
        
        <Button title='Starta' onPress={handlePress}/>
        </>
        }
        
      </View>
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={decrement}>
      <Text style={styles.p}>L</Text>
      </TouchableOpacity>
      <View style={styles.indicator} ></View>
      <View style={styles.indicator}></View>
      <View style={styles.indicator}></View>
      <TouchableOpacity onPress={increment}>
        <Text style={styles.p}>R</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenWrapper: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    height: 392,
    width: 428,
  },
  image: {
    height: 'auto',
    width: '100%'
  },
  textContainer: {
    padding: 10,
  },
  h1: {
    fontSize: 32
  },
  p: {
    fontSize: 20
  },
  navContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: 'blue',
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  indicator: {
    height: 20,
    width: 20,
    backgroundColor: 'black'
  },
  arrow: {},


})

export default OnboardingScreen