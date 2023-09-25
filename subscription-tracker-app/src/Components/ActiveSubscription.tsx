import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { arrowRight } from "../images/images";
import { supabase } from "../../lib/supabase";
import { Subscription } from "../types";
import S from "../style";
import ArrowRight from "../images/arrowRight.svg";
const ActiveSubscription = ({
  subscription,
  handleOpenSingleSubscription,
}: {
  subscription: Subscription;
  handleOpenSingleSubscription: any;
}) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 160,
      paddingHorizontal: 8,
      paddingVertical: 16,
      borderRadius: 4,
      minWidth: 241,
      backgroundColor:
        subscription.services?.color || S.tertiaryColor.backgroundColor,
      maxHeight: 262,
      maerginRight: 16,
    },
    topRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    bottomRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    icon: {
      width: 40,
      height: 40,
    },
    subTitle: {
      fontSize: 24,
      fontWeight: "400",
    },
    name: {
      fontSize: 24,
      fontWeight: "500",
    },
  });

  const imageUrl = supabase.storage
    .from("service_icons")
    .getPublicUrl(subscription.services?.icon as string);

  return (
    <Pressable
      style={[styles.container]}
      onPress={() => handleOpenSingleSubscription(subscription)}
    >
      <View style={styles.topRow}>
        <Image source={{ uri: imageUrl.data.publicUrl }} style={styles.icon} />
        <ArrowRight
          height={40}
          width={40}
          style={{ color: S.onBackgroundText.color }}
        />
      </View>
      <View style={styles.bottomRow}>
        <Text style={[S.headingThree, { color: S.OnTertiary.color }]}>
          {subscription.services?.name.charAt(0).toUpperCase()}
          {subscription.services?.name.slice(1)}
        </Text>
        <View>
          <Text style={[S.headingTwo, { color: S.OnTertiary.color }]}>
            {subscription.users.name.charAt(0).toUpperCase()}
            {subscription.users.name.slice(1).toLowerCase()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
export default ActiveSubscription;
