import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Input, Button } from 'react-native-elements'
import React, { useState } from 'react'
import { testUser, penIcon } from '../images/images'

const AddUserScreen = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.addUserScreenWrapper}>
      <Text style={styles.h1}>Lägg till användare</Text>
      <View style={styles.userContainer}>
        <ImageBackground source={testUser} resizeMode="cover" imageStyle={{borderRadius: 200}}>
          <TouchableOpacity style={styles.userImage}>
          <View style={styles.penContainer}>
          <Image source={penIcon}/>
          </View>
          </TouchableOpacity>
        </ImageBackground>
        {/* <Image style={styles.userImage} source={testUser}/> */}
        <Input
          label='Username:'
          labelStyle={{ color: "black", fontSize: 22 }}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder='jane'
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          autoCapitalize={"none"}
          style={styles.textInput}
          underlineColorAndroid='transparent'
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
      <Button 
      title='Lägg till användare'
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
      // onPress={() => supabase.auth.signOut()}
    />
    </View>
  )
}

export default AddUserScreen

const styles = StyleSheet.create({
    addUserScreenWrapper: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
        padding: 5,
    },
    h1: {
        fontSize: 36,
    },
    userContainer: {
        width: '100%',
        height: 354,
        // backgroundColor: 'cornflowerblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        height: 248,
        width: 248,
    },
    imageContainer: {
      position: 'relative',
    },
    penContainer: {
      height: 50,
      width: 50,
      position: 'absolute',
      bottom: 17,
      right: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 50.
    },
    textInput: {
      borderRadius: 4,
      backgroundColor: "'rgba(0, 0, 0, 0.25)'",
      padding: 10,
    },
})