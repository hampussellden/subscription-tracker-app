import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import ActiveSubscription from "./ActiveSubscription";
// import { arrowLeft, arrowRight } from "../images/images";
import ArrowLeft from "../images/arrowLeft.svg";
import ArrowRight from "../images/arrowRight.svg";
import S from "../style";
import {
  Category,
  Subscription,
} from "../types";
const SubscriptionScroller = ({
  category,
  subscriptions,
  handleOpenSingleSubscription,
}: {
  category: string;
  subscriptions: Subscription[];
  handleOpenSingleSubscription: (subscription: Subscription) => void;
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  let placement: number = 0;
  const handleButtonClickRight = () => {
    placement += 250;
    console.log(placement);
    
    scrollViewRef.current?.scrollTo({ x: placement, animated: true });
  }; 
  const handleButtonClickLeft = () => {
    placement-=250;
    if(placement<0){
      placement=0;
    }
    console.log(placement);
    scrollViewRef.current?.scrollTo({ x: placement, animated: true });
  };


  return (
          <>
            <View style={styles.subTitleContainer}>
              <Text style={[S.headingTwo, S.onBackgroundText]}>
                {category}
              </Text>
              <View style={styles.arrowsContainer}>
                {/* <Image source={arrowLeft} style={styles.arrows} /> */}
                <Pressable onPress={handleButtonClickLeft}>
                  <ArrowLeft
                    width={40}
                    height={40}
                    style={{ color: S.onBackgroundText.color }}
                  />
                </Pressable>
                <Pressable onPress={handleButtonClickRight}>
                  <ArrowRight
                    width={40}
                    height={40}
                    style={{ color: S.onBackgroundText.color }}
                    />
                </Pressable>
                {/* <Image source={arrowRight} style={styles.arrows} /> */}
              </View>
            </View>
            <ScrollView
              horizontal={true}
              indicatorStyle={"white"}
              contentContainerStyle={styles.contentContainer}
              ref={scrollViewRef}
            >
              {subscriptions.map(
                (subscription: Subscription, i: number) =>
                  subscription.services?.categories.name == category &&
                  subscription.active && (
                    <ActiveSubscription
                      subscription={subscription}
                      key={i}
                      handleOpenSingleSubscription={
                        handleOpenSingleSubscription
                      }
                    />
                  )
              )}
            </ScrollView>
          </>
  );
};
export default SubscriptionScroller;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
  },
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
    gap:8,
  },
});
