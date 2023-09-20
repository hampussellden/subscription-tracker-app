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
  services,
  users,
  subscriptionTiers,
}: {
  categories: Category[];
  subscriptions: Subscription[];
  services: Service[];
  users: User[];
  subscriptionTiers: SubscriptionTier[];
}) => {
  const mergeTables = (
    services: Service[],
    subscriptions: Subscription[],
    subscriptionTiers: SubscriptionTier[],
    users: User[]
  ) => {
    services.map((service: Service) => {
      subscriptions.map((subscription: Subscription) => {
        if (subscription.service_id === service.id) {
          subscription.service = service;
        }
        subscriptionTiers.map((subscriptionTier: SubscriptionTier) => {
          if (
            subscription.service?.id == subscriptionTier.service_id &&
            subscription.subscription_tier_id == subscriptionTier.id
          ) {
            subscription.subscription_tier = subscriptionTier;
          }
        });
        users.map((user: User) => {
          if (subscription.user_id == user.id) {
            subscription.user = user;
          }
        });
      });
    });
  };
  mergeTables(services, subscriptions, subscriptionTiers, users);

  const filterSubscriptions = (id: number, subscriptions: Subscription[]) => {
    return subscriptions.filter(
      (subscription: Subscription) => subscription.service?.category_id == id
    );
  };

  return (
    <>
      <ScrollView>
        {categories.length > 0 &&
          categories.map((category: Category, i: number) => (
            <>
              <View style={styles.subTitleContainer}>
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
                {filterSubscriptions(category.id, subscriptions).map(
                  (subscription: Subscription, i: number) => (
                    <ActiveSubscription subscription={subscription} key={i} />
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
