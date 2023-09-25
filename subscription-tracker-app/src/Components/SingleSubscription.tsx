import React from "react";
import { supabase } from "../../lib/supabase";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { arrowDown } from "../images/images";
import { Interval_periods, Subscription } from "../types";
import { Button } from "react-native-elements";
import Header from "./Header";

const formatDateString = (renewal_date: string): string => {
  const date = new Date(renewal_date);
  const monthIndex = date.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[monthIndex];
  const day = date.getDate();
  const formattedDate = `${day}-${monthName.substring(0, 3)}`;
  return formattedDate;
};
const getIntervalPeriod = (intervalPeriod: Interval_periods): string => {
  switch (intervalPeriod) {
    case "monthly":
      return "mån";
    case "quarterly":
      return "kvartal";
    case "semi-annual":
      return "6e mån";
    case "annual":
      return "år";
  }
};
const SingleSubscription = ({
  subscription,
  closeSingle,
  navigation,
  activeSingleSub,
}: {
  subscription: Subscription;
  closeSingle: () => void;
  navigation: any;
  activeSingleSub: boolean;
}) => {
  console.log("single sub: " + subscription);

  const imageUrl = supabase.storage
    .from("banners")
    .getPublicUrl(subscription.services.banner as string);

  const cancelSubHandler = async () => {
    const { data: active, error } = await supabase
      .from("subscriptions")
      .update({
        active: false,
      })
      .eq("id", subscription.id)
      .select();
    if (active) {
      console.log("update" + active);
      closeSingle();
    }
  };
  return (
    <View style={{ display: "flex", position: "relative" }}>
      <ScrollView
        style={{ position: "relative" }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Header
          navigation={navigation}
          activeSingleSub={activeSingleSub}
          closeSingle={closeSingle}
        />
        <Image
          style={{ width: 400, height: 500 }}
          source={{
            uri: imageUrl.data.publicUrl,
          }}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.subTitle}>Prenumerationstyp</Text>
          <Text style={styles.bigText}>
            {subscription.subscription_tiers.name}
          </Text>
          <Text style={styles.subTitle}>Betalningsdatum</Text>
          <Text style={styles.bigText}>
            {formatDateString(subscription.renewal_date).replace(/-/g, " ")}
          </Text>
          <Pressable style={styles.costContainer}>
            <Text style={styles.bigText}>
              {subscription.subscription_tiers.price}/
              {getIntervalPeriod(
                subscription.subscription_tiers.interval_period
              )}
            </Text>
            <Image source={arrowDown} style={{ width: 40, height: 40 }} />
          </Pressable>
          <Button
            title='Avsluta Prenumeration'
            titleStyle={{ color: "white", fontWeight: "bold", fontSize: 24 }}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 5,
              backgroundColor: "black",
              alignSelf: "center",
              width: 360,
              paddingHorizontal: 24,
              paddingVertical: 16,
            }}
            containerStyle={{
              alignSelf: "center",
              margin: 0,
            }}
            onPress={cancelSubHandler}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default SingleSubscription;

const styles = StyleSheet.create({
  banner: {
    width: 400,
    height: 500,
  },
  infoWrapper: {
    marginHorizontal: 16,
    gap: 16,
    marginTop: 16,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
  bigText: {
    fontSize: 36,
    fontWeight: "700",
  },
  costContainer: {
    alignSelf: "center",
    borderRadius: 5,
    width: 360,
    padding: 16,
    margin: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#A9C0FF",
  },
});
