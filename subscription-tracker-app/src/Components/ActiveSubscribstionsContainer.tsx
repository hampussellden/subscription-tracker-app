import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import ActiveSubscription from "./ActiveSubscription";
// import { arrowLeft, arrowRight } from "../images/images";
import ArrowLeft from "../images/arrowLeft.svg";
import ArrowRight from "../images/arrowRight.svg";
import S from "../style";
import {
  Category,
  Subscription,
  Service,
  User,
  SubscriptionTier,
} from "../types";
const ActiveSubscriptionsContainer = ({
  categories,
  subscriptions,
  handleOpenSingleSubscription,
}: {
  categories: string[];
  subscriptions: Subscription[];
  handleOpenSingleSubscription: (subscription: Subscription) => void;
}) => {
  return (
    <>
      <ScrollView>
        {categories.map((category_name: string, i: number) => (
          <>
            <View style={styles.subTitleContainer} key={i}>
              <Text style={[S.headingTwo, S.onBackgroundText]}>
                {category_name}
              </Text>
              <View style={styles.arrowsContainer}>
                {/* <Image source={arrowLeft} style={styles.arrows} /> */}
                <ArrowLeft
                  width={40}
                  height={40}
                  style={{ color: S.onBackgroundText.color }}
                />
                <ArrowRight
                  width={40}
                  height={40}
                  style={{ color: S.onBackgroundText.color }}
                />
                {/* <Image source={arrowRight} style={styles.arrows} /> */}
              </View>
            </View>
            <ScrollView
              horizontal={true}
              indicatorStyle={"white"}
              contentContainerStyle={styles.contentContainer}
            >
              {subscriptions.map(
                (subscription: Subscription, i: number) =>
                  subscription.services?.categories.name == category_name &&
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
        ))}
      </ScrollView>
    </>
  );
};
export default ActiveSubscriptionsContainer;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 16,
    gap: 16,
  },
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
    height: 30,
    width: 30,
  },
});
