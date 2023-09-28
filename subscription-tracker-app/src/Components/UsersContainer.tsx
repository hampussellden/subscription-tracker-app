import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import UserItem from "./UserItem";
import S from "../style";
import { themeContext } from "../Theme";

export type User = {
  id: number;
  name: string;
  profile_id: string;
  created_at: string;
  avatar_url: string;
};

const UserContainer = ({
  chosenUser,
  users,
  navigation,
  handleChosenUser,
}: {
  chosenUser: User | null;
  users: User[];
  navigation: any;
  handleChosenUser: (user: User) => void;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);

  const styles = StyleSheet.create({
    usersContiner: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
  });

  return (
    <View style={{ minHeight: 130 }}>
      <Text
        style={[
          S.headingTwo,
          {
            color: darkTheme
              ? S.onBackgroundTextDark.color
              : S.onBackgroundTextLight.color,
          },
          { marginBottom: 16 },
        ]}
      >
        Välj användare
      </Text>
      <ScrollView horizontal={true} contentContainerStyle={{ gap: 8 }}>
        {users.map((user, i) => {
          return (
            <UserItem
              chosenUser={chosenUser}
              user={user}
              handleChosenUser={handleChosenUser}
              key={i}
            />
          );
        })}
        <Button
          icon={{
            name: "plus",
            type: "font-awesome",
            size: 20,
            color: "black",
          }}
          buttonStyle={{
            backgroundColor: S.tertiaryColor.backgroundColor,
            minHeight: 40,
            minWidth: 40,
            borderRadius: 20,
          }}
          containerStyle={{
            alignSelf: "flex-end",
            transform: [{ translateX: -24 }],
          }}
          onPress={() => navigation.navigate("AddUser")}
        />
      </ScrollView>
    </View>
  );
};
export default UserContainer;
