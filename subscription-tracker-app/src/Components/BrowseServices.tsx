import React, { useState, useContext } from "react";
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
import { addLightBlack, addLightWhite } from "../images/images";
import { Service } from "../types";
import BrowseServiceItem from "./BrowseServiceItem";
import CreatingService from "./CreatingService";
import { themeContext } from "../Theme";

const BrowseServices = ({
  handleChosenService,
  services,
  handleServiceNameChange,
  chosenService,
  inputValue,
}: {
  handleChosenService: (service: Service | null) => void;
  services: Service[];
  handleServiceNameChange: (text: string) => void;
  chosenService: Service | null;
  inputValue: string;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const [opened, setOpened] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);

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
      backgroundColor: darkTheme
        ? S.primaryColorDark.backgroundColor
        : S.primaryColorLight.backgroundColor,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      width: "100%",
      borderRadius: S.borderRadiusSmall.borderRadius,
    },
  });

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
          <CreatingService
            handleServiceNameChange={handleServiceNameChange}
            inputValue={inputValue}
          />
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
            <Text
              style={[
                S.headingTwo,
                {
                  color: darkTheme
                    ? S.onPrimaryColorDark.color
                    : S.onPrimaryColorLight.color,
                },
              ]}
            >
              Skapa egen tjänst...
            </Text>
            <Image
              source={darkTheme ? addLightWhite : addLightBlack}
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
