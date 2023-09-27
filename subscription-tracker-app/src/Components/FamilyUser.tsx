import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useContext} from 'react'
import { User } from '../types';
import { supabase } from '../../lib/supabase';
import S from '../style';
import { themeContext } from '../Theme'
import { DarkTheme } from '@react-navigation/native'

const FamilyUser = ({ user }: { user: User }) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
    const imageUrl = supabase.storage
      .from("user_avatars")
      .getPublicUrl(user?.avatar_url as string);
  return (
    <View style={styles.userProfiles}>
    <Image style={styles.userImage}  source={{ uri: imageUrl.data.publicUrl }}/>
    <Text style={[S.headingTwo, darkTheme ? S.textLight : S.textDark]}>{user.name}</Text>
  </View>
  )
}

export default FamilyUser

const styles = StyleSheet.create({
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
})