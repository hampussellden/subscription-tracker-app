import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import { Button } from 'react-native-elements'
import React, {useState} from 'react'
import { gangplankProfile, arrowRight } from '../images/images'
import { supabase } from '../../lib/supabase'
import CookiepopUp from '../Components/CookiepopUp'
import TosService from '../Components/TosService'
import GdprPopUp from '../Components/GdprPopUp'
import Header from '../Components/Header'
import S from '../style'


const SettingScreen = (props:any) => {

  const session = props.route.params.session;

  // console.log(session.user.id);
    
    const [darkModeenabled, setDarkModeEnabled] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState<boolean>(false);
    const [viewCookies, setViewCookies] = useState(false);
    const [viewTos, setViewTos] = useState(false);
    const [viewGdpr, setViewGdpr] = useState(false);

    const toggleNotificationEnabled = () => {
      setNotificationEnabled(previousState => !previousState)
  }

  const updateNotification = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ global_notifications_on: true })
      .eq("id", session?.user.id);

      if (error) {
        console.log(error);
      }

    }

    const noNotificationsUpdate = async () => {
      const { error } = await supabase
      .from("profiles")
      .update({ global_notifications_on: false })
      .eq("id", session?.user.id);

      if (error) {
        console.log(error);
      }
    }
   

  notificationEnabled && updateNotification();
  !notificationEnabled && noNotificationsUpdate();
  
  
    const toggleDarkModeSwitch = () => {
        setDarkModeEnabled(previousState => !previousState)
    }

    const handleCookies = () => {
      setViewCookies(false)
    }

    const handleTos = () => {
      setViewTos(false)
    }

    const handleGdpr = () => {
      setViewGdpr(false)
    }

  return (
    <View style={styles.settingsScreenWrapper}>
      <Header navigation={props.navigation} />
      {viewCookies && <CookiepopUp onClick={handleCookies}/>}
      {viewTos && <TosService onClick={handleTos}/>}
      {viewGdpr && <GdprPopUp onClick={handleGdpr}/>}
      <Text style={styles.h1}>Inställningar</Text>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImg} source={gangplankProfile}/>
      </View>
      <View style={styles.alternativSection}>
        <View style={styles.switchSection}>
          <View style={styles.darkModeAlt}>
            <Text style={styles.altText}>Mörkt läge</Text>
            <Switch 
                    trackColor={{false: "#1f2627", true: "#1f2627"}}
                    thumbColor={darkModeenabled ? "#A9C0FF" : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkModeSwitch}
                    value={darkModeenabled}
            />
          </View>
          <View style={styles.notifikationAlt}>
            <Text style={styles.altText}>Tillåt notifikationer</Text>
            <Switch 
                    trackColor={{false: "#1f2627", true: "#1f2627"}}
                    thumbColor={notificationEnabled ? "#A9C0FF" : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotificationEnabled}
                    value={notificationEnabled}
            />
          </View>
          <View style={styles.familyAlt}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Family")}>
            <Text style={styles.altText}>Familjehantering</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("Family")}>
            <Image source={arrowRight}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.DataAlt}>
          <Text style={styles.altText}>Integritet och data</Text>
          <TouchableOpacity onPress={() => setViewCookies(true)}>
          <Text>Cookies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setViewTos(true)}>
          <Text>Användarvillkor & integritetspolicy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setViewGdpr(true)}>
          <Text>GDPR</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text>Radera konto</Text>
          </TouchableOpacity>
        </View>
      <Button 
      title='Logga ut'
      titleStyle={{ color: "white", fontWeight: "bold", fontSize: 24 }}
      buttonStyle={{
        alignSelf: "center",
        width: "100%",
        maxWidth: 396,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 5,
        backgroundColor: "rgba(0, 0, 0, 1)",
      }}
      onPress={() => supabase.auth.signOut()}
    />
    
      </View>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    settingsScreenWrapper: {
      backgroundColor: S.primaryColor.backgroundColor,
        marginTop: 48,
        height: '100%',
        flex: 1,
        gap: 10,
        paddingRight: 5, 
        paddingLeft: 5, 
        
    },
    h1: {
        fontSize: 36,
    },
    profileContainer: {
        flexDirection: 'row',
        // backgroundColor: 'purple',
        height: 262.4,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImg: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    alternativSection: {
        height: 420.8,
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        // backgroundColor: 'green',
        flexDirection: 'column',

    },
    switchSection: {
      width: '100%',
      height: 'auto',
      justifyContent: 'space-between',
      gap: 10,
    },

    darkModeAlt: {
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      // backgroundColor: 'blue',
      alignContent: 'center',
      justifyContent: 'space-between'
    },
    notifikationAlt: {
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      // backgroundColor: 'red',
      alignContent: 'center',
      justifyContent: 'space-between'
    },
    altText: {
      fontSize: 24,
    },
    familyAlt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: 'pink',
      width: '100%',
      height: 'auto'
    },
    DataAlt: {
      justifyContent: 'space-between',
      // backgroundColor: 'grey',
      width: '100%',
      height: 'auto',
      gap: 10,
    }
});