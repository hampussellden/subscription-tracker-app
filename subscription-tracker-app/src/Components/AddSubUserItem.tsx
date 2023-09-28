import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { User } from "../types";
import { supabase } from "../../lib/supabase";
import { themeContext } from "../Theme";
import S from "../style";

const AddSubUserItem = ({
  user,
  handleChooseUser,
  chosenUser,
}: {
  user: User;
  handleChooseUser: (user: User) => void;
  chosenUser: User | null;
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
            ? S.onPrimaryColorDark.color
            : S.onPrimaryColorLight.color
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
    <Pressable style={styles.container} onPress={() => handleChooseUser(user)}>
      <Image source={{ uri: imageUrl.data.publicUrl }} style={styles.userImg} />
    </Pressable>
  );
};
export default AddSubUserItem;
