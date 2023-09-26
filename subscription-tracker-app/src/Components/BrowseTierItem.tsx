import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ColorValue,
  Image,
} from "react-native";
import { Service, SubscriptionTier, Interval_periods } from "../types";
import S from "../style";
import { supabase } from "../../lib/supabase";
import ArrowRight from "../images/arrowRight.svg";

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

const BrowseTierItem = ({
  tier,
  service,
  handleChooseTier,
  chosenTier,
}: {
  tier: SubscriptionTier;
  service: Service;
  handleChooseTier: (tier: SubscriptionTier | null) => void;
  chosenTier: SubscriptionTier | null;
}) => {
  const color = service.color as ColorValue;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color,
      width: 343,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderRadius: S.borderRadiusSmall.borderRadius,
      borderWidth: chosenTier?.id == tier.id ? 4 : 0,
      borderColor: chosenTier?.id == tier.id ? "#000000" : "transparent",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
    },
    column: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
  });

  const imageUrl = supabase.storage
    .from("service_icons")
    .getPublicUrl(service.icon as string);

  return (
    <Pressable style={styles.container} onPress={() => handleChooseTier(tier)}>
      <View style={styles.column}>
        <View style={styles.row}>
          <Image
            source={{ uri: imageUrl.data.publicUrl }}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={[
              S.headingOne,
              { color: S.backgroundTransparencyColor.color },
            ]}
          >
            {tier.name.charAt(0).toUpperCase()}
            {tier.name.slice(1).toLowerCase()}
          </Text>
        </View>
        <Text
          style={[S.headingTwo, { color: S.backgroundTransparencyColor.color }]}
        >
          {tier.price} / {getIntervalPeriod(tier.interval_period)}
        </Text>
      </View>
      <ArrowRight height={24} width={24} color={"#FFFFFF"} />
    </Pressable>
  );
};
export default BrowseTierItem;
