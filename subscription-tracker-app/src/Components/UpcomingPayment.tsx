import React from "react";
import { Subscription } from "../types";
import { supabase } from "../../lib/supabase";
import { View, Text, StyleSheet, Image } from "react-native";

const UpcomingPayment = ({ subscription }: { subscription: Subscription }) => {
  const imageUrl = supabase.storage
    .from("service_icons")
    .getPublicUrl(subscription.service?.icon as string);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl.data.publicUrl }}
        style={{ width: 40, height: 40 }}
      />
      <Text>{subscription.renewal_date}</Text>
    </View>
  );
};
export default UpcomingPayment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "aqua",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
