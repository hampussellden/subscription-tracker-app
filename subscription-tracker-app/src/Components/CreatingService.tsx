import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import S from "../style";
import { arrowUp, bookmarkLight } from "../images/images";
import { Input } from "react-native-elements";
import { Category, Service } from "../types";
import { supabase } from "../../lib/supabase";
import CreateServiceCategoryScroller from "./CreateServiceCategoryScroller";
const CreatingService = ({
  handleServiceNameChange,
  inputValue,
}: {
  handleServiceNameChange: (text: string) => void;
  inputValue: string;
}) => {
  let index: number = 0;
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        console.log(error);
      }
      if (categories) {
        index = Math.floor(categories.length / 2);
        setCategories(categories as Category[]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={S.headingTwo}>Skapa egen tjänst</Text>
      <ScrollView contentContainerStyle={{ gap: 16 }}>
        <Text style={S.headingTwo}>Namn:</Text>
        <Input
          placeholder='Appnamn'
          style={styles.textInput}
          underlineColorAndroid='transparent'
          inputContainerStyle={{
            borderBottomWidth: 0,
            margin: 0,
            padding: 0,
          }}
          value={inputValue}
          onChangeText={handleServiceNameChange}
        />
        {categories.length > 0 && (
          <CreateServiceCategoryScroller categories={categories} />
        )}
        <View style={styles.row}>
          <Text style={S.headingTwo}>Icon:</Text>
          <Image source={bookmarkLight} style={{ height: 32, width: 32 }} />
        </View>
      </ScrollView>
    </View>
  );
};
export default CreatingService;

const styles = StyleSheet.create({
  container: {
    backgroundColor: S.primaryColor.backgroundColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
    gap: 16,
    borderRadius: S.borderRadiusSmall.borderRadius,
  },
  textInput: {
    borderRadius: S.borderRadiusSmall.borderRadius,
    backgroundColor: S.primaryColor.backgroundColor,
    borderWidth: 1,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
});
