import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { User } from "../Screens/HomeScreen";
import { supabase } from "../../lib/supabase";
const styles = StyleSheet.create({
  userImg: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const UserItem = ({ user }: { user: User }) => {
  const imageUrl = supabase.storage
    .from("user_avatars")
    .getPublicUrl(user.avatar_url as string);

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUrl.data.publicUrl }}
          style={styles.userImg}
        />
        <Text>
          {user.name.charAt(0).toLocaleUpperCase() + user.name.slice(1)}
        </Text>
      </View>
    </>
  );
};
export default UserItem;
