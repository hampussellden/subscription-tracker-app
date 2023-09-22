import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Subscription, Service } from "../types";
import UpcomingPayment from "./UpcomingPayment";
import S from "../style";
const styles = StyleSheet.create({});
const UpcomingPaymentsContainer = ({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) => {
  const compareDates = (a: Subscription, b: Subscription): number => {
    const date1 = new Date(a.renewal_date);
    const date2 = new Date(b.renewal_date);
    return date1.getTime() - date2.getTime();
  };
  subscriptions.sort(compareDates);

  return (
    <View>
      <Text style={S.subTitleBold}>Kommande Betalningar</Text>
      <ScrollView horizontal={true} contentContainerStyle={{ gap: 16 }}>
        <>
          {subscriptions.length > 0 &&
            subscriptions
              .sort(compareDates)
              .map((subscription, i) => (
                <UpcomingPayment subscription={subscription} key={i} />
              ))}
        </>
      </ScrollView>
    </View>
  );
};
export default UpcomingPaymentsContainer;
