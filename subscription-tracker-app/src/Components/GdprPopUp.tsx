import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useContext} from 'react'
import { closeDark } from '../images/images'
import S from '../style'
import Ts from '../testStyle'
import {themeContext} from '../../App'

const GdprPopUp = (props:any) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext)
  return (
    <View style={[styles.gdprWrapper, darkTheme ? Ts.primaryDark : Ts.primaryLight]}> 
         <View style={styles.header}>
                <TouchableOpacity onPress={() => props.onClick()}>
                <Image source={closeDark}/>
                </TouchableOpacity>
            </View>
      <Text style={styles.text}>Dataskyddsförordning (GDPR) </Text>
      <ScrollView>
      <Text style={S.label}> Vi värnar om din integritet och följer Dataskyddsförordningen (GDPR) för att säkerställa att dina personuppgifter hanteras på ett säkert och rättvist sätt. Nedan finns information om vilken data vi samlar in och varför:{"\n"}</Text>
<Text style={styles.text}>Användarinformation{"\n"}</Text>
<Text style={S.label}>Ditt namn, e-postadress, och annan relevant användarinformation.{"\n"}</Text>
<Text style={styles.text}>AnvändningsdataInformation{"\n"}</Text> 
<Text style={S.label}>om hur du använder vår app, inklusive sidvisningar, funktioner du använder, och interaktioner med innehåll.{"\n"}</Text>
<Text style={styles.text}>Teknisk information{"\n"}</Text> 
<Text style={S.label}> Information om din enhet och webbläsare, inklusive IP-adress, enhetsidentifikatorer och webbläsarhistorik.{"\n"}</Text>
<Text style={styles.text}>Varför samlar vi in denna data?{"\n"}</Text>
<Text style={styles.text}>Förbättrad användarupplevelse{"\n"}</Text>
<Text style={S.label}>Vi använder data för att anpassa och förbättra din upplevelse av vår app, inklusive att rekommendera innehåll och funktioner som kan vara av intresse för dig.{"\n"}</Text>

<Text style={styles.text}>Analys och prestanda{"\n"}</Text>
<Text style={S.label}>Data hjälper oss att analysera och förbättra appens pres tanda och funktionalitet.{"\n"}</Text>

<Text style={styles.text}>Kommunikation{"\n"}</Text>
<Text style={S.label}>Vi använder din e-postadress för att skicka uppdateringar, nyheter och viktiga meddelanden om tjänsten.</Text>
</ScrollView>
</View>
  )
}

export default GdprPopUp

const styles = StyleSheet.create({
    gdprWrapper: {
      height: '100%',
      width: '100%',
      padding: 10,
      // backgroundColor: S.primaryColor.backgroundColor,
    },
    header: {
        width:'100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      },
      text: {
        fontFamily: "DM_Sans_Regular",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 20,
        letterSpacing: -0.8,
      }
  })