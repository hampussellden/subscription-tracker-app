import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import { Input, Button } from 'react-native-elements'
import React, { useState } from 'react'
import { testUser, penIcon } from '../images/images'
import { supabase } from '../../lib/supabase'
import S from '../style'
import Header from '../Components/Header'

const AddUserScreen = (props: any) => {
  const [text, setText] = useState<string>('');

  const session = props.route.params.session;

  const addUser = async () => {
    const {error, data} = await supabase 
    .from('users')
    .insert({name: text, avatar_url: 'portrait1.jpeg', profile_id: session?.user.id})
    .select()

    if(error) {
      console.log(error);
    }

    if (data) {
      Alert.alert('user Created succesfully');
      props.navigation.goBack();
    }

  }

  return (
    <View style={styles.addUserScreenWrapper}>
      <Header navigation={props.navigation} />
      <Text style={S.headingOne}>Lägg till användare</Text>
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
          labelStyle={S.headingTwo}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder='jane'
          placeholderTextColor={"white"}
          autoCapitalize={"none"}
          style={styles.textInput}
          underlineColorAndroid='transparent'
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </View>
      <View style={{gap: 8}}>
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
        backgroundColor: "#1f2627",
      }}
      onPress={addUser}
    />
    <Button 
      title='Gå tillbacka'
      titleStyle={{ color: '#1F2627', fontWeight: "bold", fontSize: 24 }}
      buttonStyle={{
        alignSelf: "center",
        width: "100%",
        maxWidth: 396,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: "#000000",
        borderRadius: 5,
        backgroundColor: S.primaryColor.backgroundColor,
      }}
      onPress={() => props.navigation.goBack()}
      />
      </View>
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
      backgroundColor: "#1f2627",
      padding: 10,
    },
})