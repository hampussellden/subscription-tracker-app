import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, ImageBackground, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import React, {useEffect, useState} from 'react'
import { supabase } from '../../lib/supabase'
import { testUser, addUser } from '../images/images'
import DeleteUser from '../Components/DeleteUser'
import { User } from '../types'
import FamilyUser from '../Components/FamilyUser'
import Header from '../Components/Header'
import S from '../style'

const FamilyScreen = (props: any ) => {
    const [userNames, setUserNames] = useState<string[]>([]);
    const [userData, setUserData] = useState<User[]>([]);
    const [userId, setUserId] = useState<number>(0);
    const [choosenUser, setChoosenUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState(false)
    

    const session = props.route.params.session;

    useEffect(() => {
      const fetchUsers = async () => {
          const {data, error} = await supabase
          .from('users')
          .select('*')
  
          if (error) {
              console.log(error);
          }
          
            if (data) {
                data.map(users => {
                  // console.log(typeof users.avatar_url);
                    setUserNames(userNames => [...userNames, users.name as string ])
                    setUserId(users.id)
                    // setUserData(userData => [...userData, users])
                    
                  })
                  setUserData(data as User[])
            }
      }
      fetchUsers()

      
  },[])

    const imageUrl = supabase.storage
      .from("user_avatars")
      .getPublicUrl(choosenUser?.avatar_url as string);

      
  
  // console.log(userNames);
  // const test = () => {
  //   Alert.alert('cliked user')
  //   setChoosenUser()
  // }

  // console.log(userData);
  // console.log(choosenUser);
  
  

  return (
    <View style={styles.marginTop}>
    {deleteUser && <DeleteUser choosenUser={ choosenUser?.id} setState={setDeleteUser} />}
    <Header navigation={props.navigation}/>
    <View style={[deleteUser ? styles.blurred : styles.wrapper]}>
      <Text style={S.headingOne}>Familjehantering</Text>
      <View style={styles.userSection}>
        <Text style={S.headingTwo}>användare</Text>
        <View style={styles.userRow}>
          <ScrollView horizontal={true}>
            {userData.map((user, id) => {
            return <TouchableOpacity onPress={() => setChoosenUser(user)} key={id}>
            <FamilyUser user={user}/>
            </TouchableOpacity> 
          })}
          </ScrollView>
          </View>
        </View>
       <View style={styles.currentUserSection}>
        <Image style={styles.selectedUserImg} source={{ uri: imageUrl.data.publicUrl }}/>
        <View style={styles.userInfoContainer}>
          {userData.map(users => {
            if(choosenUser?.id == users.id) {
              return <View>
                <Text style={S.headingOne}>{users.name}</Text>
              </View>
            }
          })}
        {/* <Text style={styles.userInfo}>Jane Doe</Text> */}
          <TouchableOpacity onPress={() => setDeleteUser(true)}>
            <Text style={S.paragraph}>Radera Användare </Text>
          </TouchableOpacity>
        </View>
       </View>
       <View style={styles.addUserSection}>
        <TouchableOpacity onPress={() => props.navigation.navigate('AddUser')}>
        <Image style={styles.addUserImg} source={addUser}/>
        </TouchableOpacity>
       </View>
       </View>
    </View>
  )
}

export default FamilyScreen

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: S.primaryColor.backgroundColor,
        height: '100%',
        width: '100%',
        padding: 5,
        justifyContent: 'space-between',
        zIndex: 0,
        position: 'relative',
    },
    marginTop: {
      marginTop: 48,
    },
    blurred: {
      height: '100%',
      width: '100%',
      padding: 5,
      justifyContent: 'space-between',
      zIndex: 0,
      position: 'relative',
      opacity: 0.2,
    },

    h1: {
        fontSize: 40,
        fontWeight: '700',
        lineHeight: 38,
        letterSpacing: -1.8,
        padding: 5,
    },
    h2: {fontSize: 24},
    userSection: {
        width: '100%',
        height: 'auto',
        
    },
    userRow: {
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
    },
    userProfiles: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginRight: 5,
    marginLeft: 5,
    },
    userImage: {
      height: 100,
      width: 100,
      borderRadius: 100,
    },
    currentUserSection: {
      height: 'auto',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedUserImg: {
      height: 164,
      width: 164,
      borderRadius: 100,
    },
    userInfoContainer: {
      width: '100%',
      gap: 10,
    },
    addUserSection: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      height: 'auto',
      marginBottom: 100,
    },
    addUserImg: {
      height: 50,
      width: 50,
    },

})