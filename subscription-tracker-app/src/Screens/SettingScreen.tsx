import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import React, {useState} from 'react'
import { gangplankProfile, arrowRight } from '../images/images'


const SettingScreen = () => {
    
    const [darkModeenabled, setDarkModeEnabled] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const toggleNotificationEnabled = () => {
      setNotificationEnabled(previousState => !previousState)
    }

    const toggleDarkModeSwitch = () => {
        setDarkModeEnabled(previousState => !previousState)
    }

    const LogoutUser = () => {
      Alert.alert('utloggad')
    }

  return (
    <View style={styles.settingsScreenWrapper}>
      <Text style={styles.h1}>Inställningar</Text>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImg} source={gangplankProfile}/>
      </View>
      <View style={styles.alternativSection}>
        <View style={styles.switchSection}>
          <View style={styles.darkModeAlt}>
            <Text style={styles.altText}>Mörkt läge</Text>
            <Switch 
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={darkModeenabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkModeSwitch}
                    value={darkModeenabled}
            />
          </View>
          <View style={styles.notifikationAlt}>
            <Text style={styles.altText}>Tillåt notifikationer</Text>
            <Switch 
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={notificationEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotificationEnabled}
                    value={notificationEnabled}
            />
          </View>
          <View style={styles.familyAlt}>
            <Text style={styles.altText}>Familjehantering</Text>
            <TouchableOpacity>
            <Image source={arrowRight}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.DataAlt}>
          <Text style={styles.altText}>Integritet och data</Text>
          <TouchableOpacity>
          <Text>Cookies</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Text>Användarvillkor & integritetspolicy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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
      onPress={() => LogoutUser()}
    />
    
      </View>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    settingsScreenWrapper: {
        height: '100%',
        gap: 10,
        paddingRight: 24, 
        paddingLeft: 24, 
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