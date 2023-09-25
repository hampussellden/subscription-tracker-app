import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { closeDark } from '../images/images'
import S from '../style'

const TosService = (props:any) => {
  return (
    <View style={styles.tosWrapper}>
      <View style={styles.header}>
                <TouchableOpacity onPress={() => props.onClick()}>
                <Image source={closeDark}/>
                </TouchableOpacity>
            </View>
      <Text style={S.label}>Användarvillkor & Integritetspolicy </Text>
      <ScrollView>
      <Text style={S.label}> Våra användarvillkor och integritetspolicy är viktiga dokument som reglerar din användning av vår app och skyddet av dina personuppgifter. Vi uppmuntrar dig att noggrant läsa igenom och förstå dessa dokument innan du fortsätter att använda appen. Nedan hittar du en sammanfattning:
Användarvillkor
Våra användarvillkor innehåller regler och riktlinjer som styr din användning av vår app. Det inkluderar information om dina rättigheter och skyldigheter som användare.
Integritetspolicy

Vår integritetspolicy förklarar hur vi samlar in, använder och skyddar dina personuppgifter. Vi strävar alltid efter att säkerställa din integritet och säkerhet.
För att komma åt de fullständiga användarvillkoren och integritetspolicyn, vänligen besök vårt webbplats. Om du har frågor eller behöver mer information, tveka inte att kontakta vår kundtjänst.
Genom att använda appen godkänner du våra användarvillkor och integritetspolicy. Om du inte är överens med något villkor i dessa dokument, vänligen sluta använda appen. Tack för att du är en värdefull användare av vår tjänst. </Text>
</ScrollView>
    </View>
  )
}

export default TosService

const styles = StyleSheet.create({
  tosWrapper: {
    height: '100%',
    width: '100%',
    padding: 10,
    backgroundColor: S.primaryColor.backgroundColor,
  },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    text: {
      fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20, /* 125% */
    letterSpacing: 0.8,
    }
})