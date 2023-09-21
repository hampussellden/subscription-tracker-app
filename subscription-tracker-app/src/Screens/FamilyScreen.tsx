import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { supabase } from '../../lib/supabase'
import { testUser, addUser } from '../images/images'
import DeleteUser from '../Components/DeleteUser'

const FamilyScreen = (props: any, {navigation}: any) => {
    const [userNames, setUserNames] = useState<string[]>([]);
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
                // console.log(users);
                  setUserNames(userNames => [...userNames, users.name as string ])
              })
          }
      }
      fetchUsers()
  },[])


  // console.log(userNames);
  

  
  return (
    <View style={styles.wrapper}>
      {deleteUser && <DeleteUser state={deleteUser} setState={setDeleteUser} />}
      <Text style={styles.h1}>Familjehantering</Text>
      <View style={styles.userSection}>
        <Text style={styles.h2}>användare</Text>
        <View style={styles.userRow}>
          <ScrollView horizontal={true}>
          {userNames.map((user, key) => {
            return <View style={styles.userProfiles} key={key} >
              <Image style={styles.userImage} source={testUser}/>
              <Text>{user}</Text>
            </View>
          })}
          </ScrollView>
          </View>
        </View>
       <View style={styles.currentUserSection}>
        <Image style={styles.selectedUserImg} source={testUser}/>
        <View style={styles.userInfoContainer}>
        <Text style={styles.userInfo}>Jane Doe</Text>
          <TouchableOpacity onPress={() => setDeleteUser(true)}>
            <Text style={styles.userInfo}>Radera Användare </Text>
          </TouchableOpacity>
        </View>
       </View>
       <View style={styles.addUserSection}>
        <TouchableOpacity onPress={() => props.navigation.navigate('addUser')}>
        <Image style={styles.addUserImg} source={addUser}/>
        </TouchableOpacity>
       </View>
    </View>
  )
}

export default FamilyScreen

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
        padding: 5,
        justifyContent: 'space-between'
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
    gap: 20
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
    userInfo: {
      fontSize: 18
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
    },
    addUserImg: {
      height: 50,
      width: 50,
    }
})