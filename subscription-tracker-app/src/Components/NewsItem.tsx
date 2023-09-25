import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NewsItemType } from "./NewsContainer";
import S from "../style";
const NewsItem = ({ news }: { news: NewsItemType }) => {
  const maxChars = 39;
  const truncatedText = (text: string): string => {
    if (text.length < maxChars) return text;
    const returnText =
      text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
    return returnText;
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={news.icon} style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 24 }}>{news.title}</Text>
      </View>
      <Text>{truncatedText(news.content)}</Text>
    </View>
  );
};
export default NewsItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: S.tertiaryColor.backgroundColor,
    borderRadius: S.borderRadiusSmall.borderRadius,
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
