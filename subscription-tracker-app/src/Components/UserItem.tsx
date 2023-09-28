import React, { useContext } from "react";
import { themeContext } from "../Theme";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { User } from "../types";
import { supabase } from "../../lib/supabase";
import S from "../style";

const UserItem = ({
  chosenUser,
  user,
  handleChosenUser,
}: {
  chosenUser: User | null;
  user: User;
  handleChosenUser: (user: User) => void;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const styles = StyleSheet.create({
    userImg: {
      width: 82,
      height: 82,
      borderRadius: 41,
      borderWidth: chosenUser?.id === user.id ? 4 : 0,
      borderColor:
        chosenUser?.id === user.id
          ? darkTheme
            ? S.onTertiaryDark.color
            : S.onTertiaryLight.color
          : "transparent",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  });

  const imageUrl = supabase.storage
    .from("user_avatars")
    .getPublicUrl(user.avatar_url as string);

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => handleChosenUser(user)}
      >
        <Image
          source={{ uri: imageUrl.data.publicUrl }}
          style={styles.userImg}
        />
      </Pressable>
    </>
  );
};
export default UserItem;
