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
  services,
  subscriptionTiers,
}: {
  profileId: any;
  subscriptions: Subscription[];
  services: Service[];
  subscriptionTiers: SubscriptionTier[];
}) => {
  const [active, setActive] = React.useState(true);
  const [unlocked, setUnlocked] = React.useState(false);
  const [showPinInput, setShowPinInput] = React.useState(false);
  const darkMode = false;

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
            <Text style={S.subTitleBold}> 1 000kr/mån</Text>
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
