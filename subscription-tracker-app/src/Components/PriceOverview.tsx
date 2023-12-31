import React, { useContext } from "react";
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
import { themeContext } from "../Theme";

const PriceOverview = ({
  profileId,
  subscriptions,
  priceOverviewActive,
  onPress,
}: {
  profileId: any;
  subscriptions: Subscription[];
  priceOverviewActive: boolean;
  onPress: any;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const [active, setActive] = React.useState(false);
  const [unlocked, setUnlocked] = React.useState(false);
  const [showPinInput, setShowPinInput] = React.useState(false);

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
    onPress(false);
  };

  const handlePress = () => {
    if (!unlocked) {
      onPress(true);
      setShowPinInput(true);
      return;
    }
    setActive(!active);
  };
  const handleGoBackPress = () => {
    onPress(false);
    setShowPinInput(false);
  };

  return (
    <View>
      {showPinInput && !unlocked && (
        <PinCodePopUp
          profileId={profileId}
          handleUnlock={handleUnlock}
          onPress={handleGoBackPress}
        />
      )}
      <Text
        style={[
          S.headingTwo,
          {
            color: darkTheme
              ? S.onBackgroundTextDark.color
              : S.onBackgroundTextLight.color,
          },
          { marginBottom: 16 },
        ]}
      >
        Mina Kostnader
      </Text>
      <Pressable style={styles.container} onPress={handlePress}>
        <View style={styles.topRow}>
          <Text style={[S.headingTwo]}>Månadens kostnader</Text>
          <Image source={cashFileDark} style={{ width: 40, height: 40 }} />
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
            <Text style={S.headingTwo}>
              {sumOfThisMontsSubs(subscriptions)} Kr/mån
            </Text>
          </View>
        )}
        <View>
          {unlocked ? (
            <Image source={unlockedDark} style={{ width: 20, height: 20 }} />
          ) : (
            <Image source={lockedDark} style={{ width: 20, height: 20 }} />
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
    borderRadius: S.borderRadiusSmall.borderRadius,
    backgroundColor: S.tertiaryColor.backgroundColor,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
