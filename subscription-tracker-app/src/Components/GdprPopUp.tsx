import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { closeDark } from '../images/images'

const GdprPopUp = (props:any) => {
  return (
    <View style={styles.gdprWrapper}> 
         <View style={styles.header}>
                <TouchableOpacity onPress={() => props.onClick()}>
                <Image source={closeDark}/>
                </TouchableOpacity>
            </View>
      <Text>Dataskyddsförordning (GDPR)
Vi värnar om din integritet och följer Dataskyddsförordningen (GDPR) för att säkerställa att dina personuppgifter hanteras på ett säkert och rättvist sätt. Nedan finns information om vilken data vi samlar in och varför:
AnvändarinformationDitt namn, e-postadress, och annan relevant användarinformation.
AnvändningsdataInformation om hur du använder vår app, inklusive sidvisningar, funktioner du använder, och interaktioner med innehåll.
Teknisk information Information om din enhet och webbläsare, inklusive IP-adress, enhetsidentifikatorer och webbläsarhistorik.
Varför samlar vi in denna data
Förbättrad användarupplevelseVi använder data för att anpassa och förbättra din upplevelse av vår app, inklusive att rekommendera innehåll och funktioner som kan vara av intresse för dig.

Analys och prestandaData hjälper oss att analysera och förbättra appens prestanda och funktionalitet.

KommunikationVi använder din e-postadress för att skicka uppdateringar, nyheter och viktiga meddelanden om tjänsten.</Text>
    </View>
  )
}

export default GdprPopUp

const styles = StyleSheet.create({
    gdprWrapper: {
      height: '100%',
      width: '100%',
      padding: 10,
      backgroundColor: '#F1F1F1',
    },
    header: {
        width:'100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      },
  })