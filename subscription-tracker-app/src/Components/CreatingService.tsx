import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import S from "../style";
import { arrowUp, bookmarkLight, bookmarkLightWhite } from "../images/images";
import { Input } from "react-native-elements";
import { Category, Service } from "../types";
import { supabase } from "../../lib/supabase";
import CreateServiceCategoryScroller from "./CreateServiceCategoryScroller";
import { themeContext } from "../Theme";
const CreatingService = ({
  handleServiceNameChange,
  inputValue,
}: {
  handleServiceNameChange: (text: string) => void;
  inputValue: string;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkTheme
        ? S.primaryColorDark.backgroundColor
        : S.primaryColorLight.backgroundColor,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 16,
      width: "100%",
      gap: 16,
      borderRadius: S.borderRadiusSmall.borderRadius,
    },
    textInput: {
      color: darkTheme
        ? S.secondaryColorDark.color
        : S.secondaryColorLight.color,
      borderRadius: S.borderRadiusSmall.borderRadius,
      backgroundColor: darkTheme
        ? S.onPrimaryColorDark.backgroundColor
        : S.onPrimaryColorLight.backgroundColor,
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

  return (
    <View style={styles.container}>
      <Text
        style={[
          S.headingTwo,
          {
            color: darkTheme
              ? S.onPrimaryColorDark.color
              : S.onPrimaryColorLight.color,
          },
        ]}
      >
        Skapa egen tjänst
      </Text>
      <ScrollView contentContainerStyle={{ gap: 16 }}>
        <Text
          style={[
            S.headingTwo,
            {
              color: darkTheme
                ? S.onPrimaryColorDark.color
                : S.onPrimaryColorLight.color,
            },
          ]}
        >
          Namn:
        </Text>
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
          <Text
            style={[
              S.headingTwo,
              {
                color: darkTheme
                  ? S.onPrimaryColorDark.color
                  : S.onPrimaryColorLight.color,
              },
            ]}
          >
            Icon:
          </Text>
          <Image
            source={darkTheme ? bookmarkLightWhite : bookmarkLight}
            style={{ height: 32, width: 32 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default CreatingService;
