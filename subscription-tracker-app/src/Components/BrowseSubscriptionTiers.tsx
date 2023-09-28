import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Input, Button } from "react-native-elements";
import S from "../style";
import ArrowUp from "../images/arrowUp.svg";
import ArrowDown from "../images/arrowDown.svg";
import {
  addSolidBlack,
  addLightBlack,
  addSolidWhite,
  addLightWhite,
} from "../images/images";
import { Interval_periods, Service, SubscriptionTier } from "../types";
import BrowseTierItem from "./BrowseTierItem";
import { themeContext } from "../Theme";

const BrowseSubscriptionTiers = ({
  intervalPeriods,
  service,
  handleCustomCostInput,
  handleSelectedIntervalPeriod,
  handleChooseTier,
  chosenTier,
  selectedIntervalPeriod,
  costValue,
}: {
  intervalPeriods: Interval_periods[];
  service: Service | null;
  handleCustomCostInput: (input: string) => void;
  handleSelectedIntervalPeriod: any;
  handleChooseTier: (tier: SubscriptionTier | null) => void;
  chosenTier: SubscriptionTier | null;
  selectedIntervalPeriod: Interval_periods;
  costValue: number | null;
}) => {
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
  const [opened, setOpened] = useState(false);
  const [creating, setCreating] = useState<boolean>(false);

  const getIntervalPeriod = (intervalPeriod: Interval_periods): string => {
    switch (intervalPeriod) {
      case "monthly":
        return "Månadsvis";
      case "quarterly":
        return "Kvartalsvis";
      case "semi-annual":
        return "Halvårsvis";
      case "annual":
        return "Årligen";
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: S.tertiaryColor.backgroundColor,
      paddingVertical: 12,
      maxWidth: 360,
      display: "flex",
      alignItems: "center",
      borderRadius: S.borderRadiusSmall.borderRadius,
    },
    creatingContainer: {
      backgroundColor: darkTheme
        ? S.primaryColorDark.backgroundColor
        : S.primaryColorLight.backgroundColor,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 16,
      width: "100%",
      gap: 16,
      borderRadius: S.borderRadiusSmall.borderRadius,
    },
    createNewTierBtn: {
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
    textInput: {
      color: darkTheme
        ? S.secondaryColorDark.color
        : S.secondaryColorLight.color,
      borderRadius: S.borderRadiusSmall.borderRadius,
      backgroundColor: darkTheme
        ? S.onPrimaryColorDark.backgroundColor
        : S.onPrimaryColorLight.backgroundColor,
      borderWidth: 1,
      padding: 10,
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
        Välj Prisklass:
      </Text>
      {creating && (
        <View style={styles.creatingContainer}>
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
            Skapa egen tjänst
          </Text>
          <ScrollView contentContainerStyle={{ gap: 16 }}>
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
              Pris:
            </Text>
            <Input
              placeholder='Kostnad'
              keyboardType='numeric'
              style={styles.textInput}
              underlineColorAndroid='transparent'
              inputContainerStyle={{
                borderBottomWidth: 0,
                margin: 0,
                padding: 0,
              }}
              value={costValue?.toString()}
              onChangeText={handleCustomCostInput}
            />
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
              Kostnadsvariant:
            </Text>
            <ScrollView horizontal={true} contentContainerStyle={{ gap: 24 }}>
              {intervalPeriods.map((period, i) => (
                <Button
                  title={getIntervalPeriod(period)}
                  type='clear'
                  titleStyle={{
                    color: darkTheme
                      ? S.onPrimaryColorDark.color
                      : S.onPrimaryColorLight.color,
                    fontWeight:
                      selectedIntervalPeriod === period ? "bold" : "normal",
                  }}
                  onPress={() => handleSelectedIntervalPeriod(period)}
                  key={i}
                />
              ))}
            </ScrollView>
          </ScrollView>
        </View>
      )}
      {opened && !creating && (
        <>
          <ScrollView
            style={{ maxHeight: 240 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {service?.subscription_tiers?.map((tier, i) => (
              <BrowseTierItem
                tier={tier}
                service={service}
                key={i}
                handleChooseTier={handleChooseTier}
                chosenTier={chosenTier}
              />
            ))}
          </ScrollView>
          <Pressable
            style={styles.createNewTierBtn}
            onPress={() => {
              setCreating(true), handleChooseTier(null);
            }}
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
              Skapa eget pris...
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
export default BrowseSubscriptionTiers;
