import { View, Text, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import React from 'react'

const DeleteUser = (props: any) => {

    const handlePress = () => {
        props.setState(false)
    }
  return (
    <View style={styles.deleteContainer}>
      <Text>Är du säker på att du vill ta bort användaren?</Text>
      <Button
        title='Radera användare'
        titleStyle={{ color: "white", fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          marginTop: 20,
          width: "100%",
          maxWidth: 396,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 5,
          backgroundColor: "rgba(0, 0, 0, 1)",
          alignSelf: "center",
        }}
        // disabled={loading}
        // onPress={() => {Alert.alert('clicked')}}
      />
      <Button
        title='Gå Tillbaka'
        titleStyle={{ color: "white", fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          marginTop: 20,
          width: "100%",
          maxWidth: 396,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 5,
          backgroundColor: "rgba(0, 0, 0, 1)",
          alignSelf: "center",
        }}
        // disabled={loading}
        onPress={handlePress}
      />
    </View>
  )
}

export default DeleteUser

const styles = StyleSheet.create({
    deleteContainer: {
        height: 208,
        width: 395.2,
        backgroundColor: 'blue'
    }
})