import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import S from "../style";
import ArrowUp from "../images/arrowUp.svg";
import ArrowDown from "../images/arrowDown.svg";
import {
  addSolidBlack,
  addLightBlack,
  addSolidWhite,
  addLightWhite,
} from "../images/images";
import { Service } from "../types";
import BrowseServiceItem from "./BrowseServiceItem";
import CreatingService from "./CreatingService";
const BrowseServices = ({
  handleChosenService,
  services,
  handleServiceNameChange,
  chosenService,
}: {
  handleChosenService: (service: Service | null) => void;
  services: Service[];
  handleServiceNameChange: (text: string) => void;
  chosenService: Service | null;
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const darkMode = false;
  return (
    <View style={styles.container}>
      <Text
        style={[
          S.headingTwo,
          {
            alignSelf: "flex-start",
            paddingHorizontal: 16,
            marginVertical: 12,
          },
        ]}
      >
        Sök efter tjänst
      </Text>
      {creating && (
        <>
          <CreatingService handleServiceNameChange={handleServiceNameChange} />
        </>
      )}
      {opened && !creating && (
        <>
          <ScrollView
            style={{ maxHeight: 240 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {services.map((service) => (
              <BrowseServiceItem
                service={service}
                onPress={handleChosenService}
                key={service.id}
                chosenService={chosenService}
              />
            ))}
          </ScrollView>
          <Pressable
            style={styles.createNewServiceBtn}
            onPress={() => setCreating(true)}
          >
            <Text style={[S.headingTwo, { color: S.onBackgroundText.color }]}>
              Skapa egen tjänst...
            </Text>
            <Image
              source={darkMode ? addLightWhite : addLightBlack}
              style={{ height: 60, width: 60 }}
            />
          </Pressable>
        </>
      )}
      <Pressable
        onPress={() => {
          if (creating) {
            handleServiceNameChange;
            handleChosenService(services[10]);
          }
          setOpened(!opened), setCreating(false);
        }}
      >
        {opened
          ? () => <ArrowUp height={40} width={40} />
          : () => <ArrowDown height={40} width={40} />}
      </Pressable>
    </View>
  );
};
export default BrowseServices;

const styles = StyleSheet.create({
  container: {
    backgroundColor: S.tertiaryColor.backgroundColor,
    paddingVertical: 12,
    maxWidth: 360,
    display: "flex",
    alignItems: "center",
    borderRadius: S.borderRadiusSmall.borderRadius,
  },
  createNewServiceBtn: {
    backgroundColor: S.primaryColor.backgroundColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    width: "100%",
    borderRadius: S.borderRadiusSmall.borderRadius,
  },
});
