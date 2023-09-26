import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import React from "react";
import { supabase } from "../../lib/supabase";
import S from "../style";

const DeleteUser = (props: any) => {


  const handlePress = () => {
    props.setState(false);
  };

  const deleteFunction = async () => {
    const {error, data} = await supabase
    .from('users')
    .delete()
    .eq('id', props.choosenUser)
    .select()

    if(error) {
      console.log(error);
    }

    if(data) {
      Alert.alert('user was deleted')
      handlePress();
    }
  };

  return (
    <View style={styles.deleteContainer}>
      <Text style={S.paragraph}>
        Är du säker på att du vill ta bort användaren? 
      </Text>
      <Text>{props.choosenUser}</Text>
      <Button
        title='Radera användare'
        titleStyle={{ color: "white", fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          marginTop: 20,
          width: "100%",
          maxWidth: 396,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 5,
          backgroundColor: "rgba(0, 0, 0, 1)",
          alignSelf: "center",
        }}
        // disabled={loading}
        onPress={deleteFunction}
      />
      <Button
        title='Gå Tillbaka'
        titleStyle={{ color: "black", fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          marginTop: 20,
          width: "100%",
          maxWidth: 396,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "#000000",
          backgroundColor: "white",
          alignSelf: "center",
        }}
        // disabled={loading}
        onPress={handlePress}
      />
    </View>
  );
};

export default DeleteUser;

const styles = StyleSheet.create({
  deleteContainer: {
    height: 208,
    width: 395.2,
    zIndex: 100,
    padding: 5,
    position: "absolute",
    top: "30%",
    opacity: 1,
  },
});
