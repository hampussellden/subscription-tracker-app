import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Subscription, Service } from "../types";
import UpcomingPayment from "./UpcomingPayment";
const styles = StyleSheet.create({
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
const UpcomingPaymentsContainer = ({
  subscriptions,
  services,
}: {
  subscriptions: Subscription[];
  services: Service[];
}) => {
  return (
    <>
      <Text style={styles.subTitle}>Kommande Betalningar</Text>
      <ScrollView horizontal={true} contentContainerStyle={{ gap: 8 }}>
        <>
          {subscriptions.length > 0 &&
            subscriptions.map((subscription, i) => (
              <UpcomingPayment subscription={subscription} key={i} />
            ))}
        </>
      </ScrollView>
    </>
  );
};
export default UpcomingPaymentsContainer;
