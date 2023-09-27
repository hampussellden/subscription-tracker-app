import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import React, {useContext} from "react";
import { supabase } from "../../lib/supabase";
import S from "../style";
import { themeContext } from '../Theme'

const DeleteUser = (props: any) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);

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
      <Text style={[S.paragraph, darkTheme ? S.textLight : S.textDark]}>
        Är du säker på att du vill ta bort användaren? 
      </Text>
      <Button
        title='Radera användare'
        titleStyle={{ color: darkTheme ? S.textDark.color : S.textLight.color, fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          marginTop: 20,
          width: "100%",
          maxWidth: 396,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 5,
          backgroundColor: darkTheme ? S.primaryColorLight.backgroundColor : S.primaryColorDark.backgroundColor,
          alignSelf: "center",
        }}
        // disabled={loading}
        onPress={deleteFunction}
      />
      <Button
        title='Gå Tillbaka'
        titleStyle={{ color: "black", fontWeight: "bold", fontSize: 24 }}
        buttonStyle={{
          alignSelf: "center",
          width: "100%",
          maxWidth: 396,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderWidth: 2,
          borderColor: darkTheme ? S.textLight.color : S.textDark.color,
          borderRadius: 5,
          backgroundColor: S.primaryColor.backgroundColor,
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
