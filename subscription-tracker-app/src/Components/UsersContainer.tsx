import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import UserItem from "./UserItem";
import S from "../style";

const styles = StyleSheet.create({
  usersContiner: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
export type User = {
  id: number;
  name: string;
  profile_id: string;
  created_at: string;
  avatar_url: string;
};

const UserContainer = ({
  users,
  navigation,
}: {
  users: User[];
  navigation: any;
}) => {
  return (
    <View style={{ minHeight: 130 }}>
      <Text style={[S.headingTwo, S.onBackgroundText]}>Välj användare</Text>
      <ScrollView horizontal={true} contentContainerStyle={{ gap: 8 }}>
        {users.map((user) => {
          return <UserItem user={user} />;
        })}
        <Button
          icon={{
            name: "plus",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          buttonStyle={{
            backgroundColor: "#edaaa8",
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
