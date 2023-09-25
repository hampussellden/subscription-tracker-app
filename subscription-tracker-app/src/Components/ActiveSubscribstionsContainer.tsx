import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import {
  Subscription,
} from "../types";
import SubscriptionScroller from "./SubscriptionScroller";
const ActiveSubscriptionsContainer = ({
  categories,
  subscriptions,
  handleOpenSingleSubscription,
}: {
  categories: string[];
  subscriptions: Subscription[];
  handleOpenSingleSubscription: (subscription: Subscription) => void;
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <>
      <ScrollView>
        {categories.map((category: string, i: number) => (
            <SubscriptionScroller category={category} subscriptions={subscriptions} key={i} handleOpenSingleSubscription={handleOpenSingleSubscription}/>
        ))}
      </ScrollView>
    </>
  );
};
export default ActiveSubscriptionsContainer;

const styles = StyleSheet.create({});
