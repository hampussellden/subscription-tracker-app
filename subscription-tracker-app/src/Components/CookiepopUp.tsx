import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { closeDark } from '../images/images'

const CookiepopUp = (props:any) => {
  return (
    <View style={styles.infoScreenWrapper}>
        <View style={styles.infoContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.onClick()}>
                <Image source={closeDark}/>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    <Text style={styles.boldText}>Cookie-inställningar</Text>
Vi värdesätter din integritet och använder cookies och liknande tekniker för att förbättra din upplevelse på vår app och webbplats. Nedan kan du anpassa dina cookie-inställningar. 
Nödvändiga cookies Dessa cookies är nödvändiga för att appen ska fungera korrekt. De hjälper till med att göra webbplatsen användbar genom att aktivera grundläggande funktioner som sidnavigering och åtkomst till säkra områden.
Prestanda och statistik Vi använder dessa cookies för att samla in information om hur du interagerar med vår app och för att förbättra prestanda och användarupplevelse. Informationen vi samlar in är anonym och hjälper oss att förstå hur våra användare använder appen.
Funktionella cookies Dessa cookies gör det möjligt för appen att erbjuda utökade funktioner och personlig anpassning. De kan vara inställda av oss eller tredje parter vars tjänster vi har lagt till i appen.
Marknadsförings- och reklamcookies Vi och våra partners använder dessa cookies för att visa annonser som är relevanta för dina intressen. De kan även användas för att mäta effektiviteten av reklamkampanjer.
Genom att justera dina cookie-inställningar kan du kontrollera vilka typer av cookies som används. Observera att vissa funktioner i appen kan vara begränsade om du inaktiverar vissa cookies. För mer information om hur vi hanterar dina personuppgifter, vänligen läs vår integritetspolicy.</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    infoScreenWrapper: {
        height: '100%',
        width: '100%',
        padding: 10,
        backgroundColor: '#F1F1F1',
    },
    infoContainer: {
        height: 844,
        width: '100%'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textContainer: {},
    boldText: {
        fontWeight: 'bold',
    },
    text: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20, /* 125% */
    letterSpacing: 0.8,
    }

})

export default CookiepopUp