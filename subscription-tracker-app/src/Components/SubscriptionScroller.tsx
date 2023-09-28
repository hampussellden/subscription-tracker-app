import React, { useEffect, useState, useContext, useRef } from "react";
import { themeContext } from "../Theme";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import ActiveSubscription from "./ActiveSubscription";
// import { arrowLeft, arrowRight } from "../images/images";
import ArrowLeft from "../images/arrowLeft.svg";
import ArrowRight from "../images/arrowRight.svg";
import S from "../style";
import { Subscription, User } from "../types";
const SubscriptionScroller = ({
  chosenUser,
  category,
  subscriptions,
  handleOpenSingleSubscription,
}: {
  chosenUser: User | null;
  category: string;
  subscriptions: Subscription[];
  handleOpenSingleSubscription: (subscription: Subscription) => void;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const scrollViewRef = useRef<ScrollView | null>(null);
  let placement: number = 0;
  const handleButtonClickRight = () => {
    placement += 250;
    scrollViewRef.current?.scrollTo({ x: placement, animated: true });
  };
  const handleButtonClickLeft = () => {
    placement -= 250;
    if (placement < 0) {
      placement = 0;
    }
    scrollViewRef.current?.scrollTo({ x: placement, animated: true });
  };
  const styles = StyleSheet.create({
    subTitleContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 8,
    },
    arrowsContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
    },
  });
  return (
    <>
      <View style={styles.subTitleContainer}>
        <Text
          style={[
            S.headingTwo,
            {
              color: darkTheme
                ? S.onBackgroundTextDark.color
                : S.onBackgroundTextLight.color,
            },
          ]}
        >
          {category}
        </Text>
        <View style={styles.arrowsContainer}>
          {/* <Image source={arrowLeft} style={styles.arrows} /> */}
          <Pressable onPress={handleButtonClickLeft}>
            <ArrowLeft
              width={40}
              height={40}
              style={{
                color: darkTheme
                  ? S.onBackgroundTextDark.color
                  : S.onBackgroundTextLight.color,
              }}
            />
          </Pressable>
          <Pressable onPress={handleButtonClickRight}>
            <ArrowRight
              width={40}
              height={40}
              style={{
                color: darkTheme
                  ? S.onBackgroundTextDark.color
                  : S.onBackgroundTextLight.color,
              }}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        indicatorStyle={"white"}
        contentContainerStyle={{ gap: 16 }}
        ref={scrollViewRef}
      >
        {subscriptions.map(
          (subscription: Subscription, i: number) =>
            subscription.services?.categories.name == category &&
            subscription.active &&
            (chosenUser ? (
              chosenUser?.id == subscription.user_id ? (
                <ActiveSubscription
                  subscription={subscription}
                  key={i}
                  handleOpenSingleSubscription={handleOpenSingleSubscription}
                />
              ) : (
                <></>
              )
            ) : (
              <ActiveSubscription
                subscription={subscription}
                key={i}
                handleOpenSingleSubscription={handleOpenSingleSubscription}
              />
            ))
        )}
      </ScrollView>
    </>
  );
};
export default SubscriptionScroller;
