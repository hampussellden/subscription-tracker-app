import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { User } from "../types";
import AddSubUserItem from "./AddSubUserItem";
const styles = StyleSheet.create({});
const ChooseUserContainer = ({
  users,
  handleChooseUser,
  chosenUser,
}: {
  users: User[];
  handleChooseUser: (user: User) => void;
  chosenUser: User | null;
}) => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={{ gap: 8 }}>
      {users.map((user, i) => (
        <AddSubUserItem
          user={user}
          handleChooseUser={handleChooseUser}
          chosenUser={chosenUser}
          key={i}
        />
      ))}
    </ScrollView>
  );
};
export default ChooseUserContainer;
