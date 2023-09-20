import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import UserItem from "./UserItem";

const styles = StyleSheet.create({
  usersContiner: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
export type User = {
  id: number;
  name: string;
  profile_id: string;
  created_at: string;
  avatar_url: string;
};

const example = ({ users }: { users: User[] }) => {
  return (
    <>
      <Text style={styles.subTitle}>Användare</Text>
      <ScrollView horizontal={true} contentContainerStyle={{ gap: 8 }}>
        {users.map((user) => {
          return <UserItem user={user} />;
        })}
        <Button
          title='+'
          buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
          containerStyle={{
            height: 40,
            width: 40,
            borderRadius: 20,
            marginBottom: 10,
            alignSelf: "flex-end",
          }}
        />
      </ScrollView>
    </>
  );
};
export default example;
