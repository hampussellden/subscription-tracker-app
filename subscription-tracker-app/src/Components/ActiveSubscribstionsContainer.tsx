import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import ActiveSubscription from "./ActiveSubscription";
import { arrowLeft, arrowRight } from "../images/images";
import { Category, Subscription, Service } from "../Screens/HomeScreen";
const ActiveSubscriptionsContainer = ({
  categories,
  subscriptions,
  services,
}: {
  categories: Category[];
  subscriptions: Subscription[];
  services: Service[];
}) => {
  const addServiceToSubscription = (
    services: Service[],
    subscriptions: Subscription[]
  ) => {
    services.map((service: Service) => {
      subscriptions.map((subscription: Subscription) => {
        if (subscription.service_id === service.id) {
          subscription.service = service;
        }
      });
    });
  };
  addServiceToSubscription(services, subscriptions);
  const filterSubscriptions = (category_id: number) => {
    return subscriptions.filter(
      (subscription: Subscription) =>
        subscription.service?.category_id === category_id
    );
  };
  return (
    <>
      <ScrollView>
        {categories.length > 0 &&
          categories.map((category: Category) => (
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
                {filterSubscriptions(category.id).map(
                  (subscription: Subscription) => (
                    <ActiveSubscription subscription={subscription} />
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
