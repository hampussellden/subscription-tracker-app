import React from "react";
import { View, Text, StyleSheet } from "react-native";
const styles = StyleSheet.create({});
export type User = {
  id: number;
  name: string;
  profile_id: string;
  created_at: string;
  avatar_url: string;
};
const example = ({ users }: { users: User[] }) => {
  return (
    <View>
      {users.map((user) => {
        return <Text>{user.name}</Text>;
      })}
    </View>
  );
};
export default example;
