import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { arrowRight } from "../images/images";
import { supabase } from "../../lib/supabase";
import { Subscription } from "../Screens/HomeScreen";
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
      backgroundColor: subscription.service?.color || "rgba(0, 0, 0, 0.25)",
      maxHeight: 262,
      maerginRight: 16,
    },
    topRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    bottomRow: {},
    icon: {
      width: 40,
      height: 40,
    },
  });

  const imageUrl = supabase.storage
    .from("service_icons")
    .getPublicUrl(subscription.service?.icon as string);

  return (
    <Pressable style={[styles.container]}>
      <View style={styles.topRow}>
        <Image source={{ uri: imageUrl.data.publicUrl }} style={styles.icon} />
        <Image source={arrowRight} />
      </View>
      <View style={styles.bottomRow}>
        <Text>{subscription.service?.name}</Text>
      </View>
    </Pressable>
  );
};
export default ActiveSubscription;
