import React from "react";
import S from "../style";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import PinCodePopUp from "./PinCodePopUp";
import {
  lockedDark,
  lockedLight,
  cashFileDark,
  cashFileLight,
  unlockedDark,
  unlockedLight,
} from "../images/images";
import { Subscription, Service, SubscriptionTier } from "../types";

const PriceOverview = ({
  profileId,
  subscriptions,
}: {
  profileId: any;
  subscriptions: Subscription[];
}) => {
  const [active, setActive] = React.useState(true);
  const [unlocked, setUnlocked] = React.useState(false);
  const [showPinInput, setShowPinInput] = React.useState(false);
  const darkMode = false;

  const sumOfThisMontsSubs = (subscriptions: Subscription[]): number => {
    const now = new Date();
    var oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);

    let totalPrice = 0;

    for (const subscription of subscriptions) {
      const renewalDate = new Date(subscription.renewal_date);

      // Check if the renewal date is within one month from now
      if (renewalDate <= oneMonthFromNow) {
        totalPrice += subscription.subscription_tiers.price;
      }
    }
    return totalPrice;
  };

  const handleUnlock = () => {
    setUnlocked(true);
    setShowPinInput(false);
  };

  const handlePress = () => {
    if (!unlocked) {
      setShowPinInput(true);
      return;
    }
    setActive(!active);
  };

  return (
    <View>
      {showPinInput && !unlocked && (
        <PinCodePopUp profileId={profileId} handleUnlock={handleUnlock} />
      )}
      <Text style={S.subTitleBold}>Mina Kostnader</Text>
      <Pressable
        style={[styles.container, S.primaryColor]}
        onPress={handlePress}
      >
        <View style={styles.topRow}>
          <Text style={S.subTitleBold}>Månadens kostnader</Text>
          <Image
            source={darkMode ? cashFileLight : cashFileDark}
            style={{ width: 40, height: 40 }}
          />
        </View>
        {active && unlocked && (
          <View
            style={{
              borderTopWidth: 1,
              alignSelf: "flex-start",
              width: "100%",
              paddingVertical: 8,
              marginTop: 8,
            }}
          >
            <Text style={S.subTitleBold}>
              {sumOfThisMontsSubs(subscriptions)} Kr/mån
            </Text>
          </View>
        )}
        <View>
          {unlocked ? (
            <Image
              source={darkMode ? unlockedLight : unlockedDark}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <Image
              source={darkMode ? lockedLight : lockedDark}
              style={{ width: 20, height: 20 }}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
};
export default PriceOverview;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
