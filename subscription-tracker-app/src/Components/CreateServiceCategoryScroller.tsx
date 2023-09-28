import React, { useRef, useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import S from "../style";
import ArrowLeft from "../images/arrowLeft.svg";
import ArrowRight from "../images/arrowRight.svg";
import { Category } from "../types";
import { themeContext } from "../Theme";

const CreateServiceCategoryScroller = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const ref = useRef<Text>(null);

  let placement: number = 2;
  const handleButtonClickRight = () => {
    placement += 1;
    if (placement >= categories.length) {
      placement -= 1;
    }
  };
  const handleButtonClickLeft = () => {
    placement -= 1;
    if (placement < 0) {
      placement = 0;
    }
  };

  const styles = StyleSheet.create({
    container: {
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
    },
  });

  return (
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
        Klass:
      </Text>
      <View style={[styles.row, { gap: 16, marginLeft: 24 }]}>
        <Pressable onPress={() => handleButtonClickLeft}>
          <ArrowLeft
            height={24}
            width={24}
            color={
              darkTheme
                ? S.onPrimaryColorDark.color
                : S.onPrimaryColorLight.color
            }
          />
        </Pressable>
        <Text
          style={[
            S.headingTwo,
            {
              color: darkTheme
                ? S.onPrimaryColorDark.color
                : S.onPrimaryColorLight.color,
            },
          ]}
          ref={ref}
        >
          {categories[placement]?.name}
        </Text>
        <Pressable onPress={() => handleButtonClickRight}>
          <ArrowRight
            height={24}
            width={24}
            color={
              darkTheme
                ? S.onPrimaryColorDark.color
                : S.onPrimaryColorLight.color
            }
          />
        </Pressable>
      </View>
    </View>
  );
};
export default CreateServiceCategoryScroller;
