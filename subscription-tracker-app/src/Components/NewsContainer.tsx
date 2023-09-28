import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { netflixIcon, spotifyIcon } from "../images/images";
import NewsItem from "./NewsItem";
import S from "../style";
import { themeContext } from "../Theme";

export type NewsItemType = {
  icon: any;
  title: string;
  content: string;
};

const NewsContainer = () => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const mockNews: NewsItemType[] = [
    {
      icon: netflixIcon,
      title: "Netflix höjer priset!",
      content: "Netflix höjer priset med 20kr i månaden",
    },
    {
      icon: spotifyIcon,
      title: "Spotify höjer priset!",
      content: "Spotify höjer priset med 20kr i månaden",
    },
  ];
  return (
    <View>
      <Text
        style={[
          S.headingTwo,
          {
            color: darkTheme
              ? S.onBackgroundTextDark.color
              : S.onBackgroundTextLight.color,
          },
          { marginBottom: 16 },
        ]}
      >
        Nyheter
      </Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
      >
        <>
          {mockNews.length > 0 &&
            mockNews.map((item) => (
              <>
                <NewsItem news={item} />
              </>
            ))}
        </>
      </ScrollView>
    </View>
  );
};
export default NewsContainer;

const styles = StyleSheet.create({
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomRow: {},
  icon: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    gap: 16,
  },
  subTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  arrowsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  arrows: {
    height: 40,
    width: 40,
  },
});
