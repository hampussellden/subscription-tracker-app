import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ColorValue,
  Image,
} from "react-native";
import { Service } from "../types";
import S from "../style";
import { supabase } from "../../lib/supabase";
import ArrowRight from "../images/arrowRight.svg";
const BrowseServiceItem = ({
  service,
  onPress,
  chosenService,
}: {
  service: Service;
  onPress: (service: Service) => void;
  chosenService: Service | null;
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
      borderWidth: chosenService?.id == service.id ? 4 : 0,
      borderColor: chosenService?.id == service.id ? "#000000" : "transparent",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
    },
  });

  const imageUrl = supabase.storage
    .from("service_icons")
    .getPublicUrl(service.icon as string);

  return (
    <Pressable style={styles.container} onPress={() => onPress(service)}>
      <View style={styles.row}>
        <Image
          source={{ uri: imageUrl.data.publicUrl }}
          style={{ height: 40, width: 40 }}
        />
        <Text style={[S.headingOne, { color: "#FFFFFF" }]}>
          {service.name.charAt(0).toUpperCase()}
          {service.name.slice(1).toLowerCase()}
        </Text>
      </View>
      <ArrowRight height={24} width={24} color={"#FFFFFF"} />
    </Pressable>
  );
};
export default BrowseServiceItem;
