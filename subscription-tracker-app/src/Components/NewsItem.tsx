import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NewsItemType } from "./NewsContainer";
import S from "../style";
const NewsItem = ({ news }: { news: NewsItemType }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={news.icon} style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 24 }}>{news.title}</Text>
      </View>
      <Text>{news.content}</Text>
    </View>
  );
};
export default NewsItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: S.primaryColor.backgroundColor,
    borderRadius: 4,
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
