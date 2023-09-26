import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import S from "../style";
import { Switch } from "react-native-elements";
import { bellDark, bellLight } from "../images/images";
const styles = StyleSheet.create({
  bell: {
    width: 24,
    height: 24,
  },
});
const NotificationsForNewSub = ({
  handleToggleNotification,
}: {
  handleToggleNotification: () => void;
}) => {
  const [notificationEnabled, setNotificationEnabled] =
    React.useState<boolean>(false);

  const toggleNotificationEnabled = () => {
    setNotificationEnabled((previousState) => !previousState);
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginTop: 16,
      }}
    >
      <View>
        <Text style={S.headingTwo}>Skicka mig notiser</Text>
        <Text style={S.label}>Speciellt för denna tjänst</Text>
      </View>
      <View>
        <View style={{ display: "flex", flexDirection: "row", gap: 24 }}>
          <Image source={bellDark} style={styles.bell} />
          <Image source={bellLight} style={styles.bell} />
        </View>
        <Switch
          trackColor={{ false: "#1f2627", true: "#1f2627" }}
          thumbColor={notificationEnabled ? "#A9C0FF" : "#f4f3f4"}
          ios_backgroundColor='#3e3e3e'
          style={{ marginHorizontal: 12, marginVertical: 8 }}
          onValueChange={() => {
            handleToggleNotification(), toggleNotificationEnabled();
          }}
          value={notificationEnabled}
        />
      </View>
    </View>
  );
};
export default NotificationsForNewSub;
