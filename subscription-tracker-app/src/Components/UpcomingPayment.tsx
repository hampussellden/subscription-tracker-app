import React from "react";
import { Subscription } from "../types";
import { supabase } from "../../lib/supabase";
import { View, Text, StyleSheet, Image } from "react-native";
import S from "../style";

const UpcomingPayment = ({ subscription }: { subscription: Subscription }) => {
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

  const imageUrl = supabase.storage
    .from("service_icons")
    .getPublicUrl(subscription.services.icon as string);

  return (
    <View style={[styles.container, S.primaryColor]}>
      <Image
        source={{ uri: imageUrl.data.publicUrl }}
        style={{ width: 40, height: 40 }}
      />
      <Text style={S.text}>
        {formatDateString(subscription.renewal_date).replace(/-/g, " ")}
      </Text>
    </View>
  );
};
export default UpcomingPayment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "aqua",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    borderRadius: 4,
  },
});
