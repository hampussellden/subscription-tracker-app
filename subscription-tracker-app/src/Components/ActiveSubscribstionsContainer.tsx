import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import ActiveSubscription from "./ActiveSubscription";
import { arrowLeft, arrowRight } from "../images/images";
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
  categories: Category[];
  subscriptions: Subscription[];
  handleOpenSingleSubscription: any;
}) => {
  return (
    <>
      <ScrollView>
        {categories.map((category: Category, i: number) => (
          <>
            <View style={styles.subTitleContainer} key={i}>
              <Text style={styles.subTitle}>{category.name}</Text>
              <View style={styles.arrowsContainer}>
                <Image source={arrowLeft} style={styles.arrows} />
                <Image source={arrowRight} style={styles.arrows} />
              </View>
            </View>
            <ScrollView
              horizontal={true}
              indicatorStyle={"white"}
              contentContainerStyle={styles.contentContainer}
            >
              {subscriptions.map(
                (subscription: Subscription, i: number) =>
                  subscription.services?.category_id == category.id &&
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
