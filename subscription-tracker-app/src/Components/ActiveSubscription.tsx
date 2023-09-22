import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { arrowRight } from "../images/images";
import { supabase } from "../../lib/supabase";
import { Subscription } from "../types";
const ActiveSubscription = ({
  subscription,
}: {
  subscription: Subscription;
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
      backgroundColor: subscription.services?.color || "rgba(0, 0, 0, 0.25)",
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
    <Pressable style={[styles.container]}>
      <View style={styles.topRow}>
        <Image source={{ uri: imageUrl.data.publicUrl }} style={styles.icon} />
        <Image source={arrowRight} />
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.subTitle}>
          {subscription.services?.name.charAt(0).toUpperCase()}
          {subscription.services?.name.slice(1)}
        </Text>
        <View>
          <Text style={styles.name}>
            {subscription.users.name.charAt(0).toUpperCase()}
            {subscription.users.name.slice(1).toLowerCase()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
export default ActiveSubscription;
