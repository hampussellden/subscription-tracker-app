import React, { useState } from "react";
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

const BrowseSubscriptionTiers = ({
  intervalPeriods,
  service,
  handleCustomCostInput,
  handleSelectedIntervalPeriod,
  handleChooseTier,
  chosenTier,
}: {
  intervalPeriods: Interval_periods[];
  service: Service;
  handleCustomCostInput: (input: string) => void;
  handleSelectedIntervalPeriod: any;
  handleChooseTier: (tier: SubscriptionTier | null) => void;
  chosenTier: SubscriptionTier | null;
}) => {
  const [opened, setOpened] = useState(false);
  const [creating, setCreating] = useState<boolean>(false);

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
          <Text style={S.headingTwo}>Skapa egen tjänst</Text>
          <ScrollView contentContainerStyle={{ gap: 16 }}>
            <Text style={S.headingTwo}>Pris:</Text>
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
              onChangeText={handleCustomCostInput}
            />
            <Text style={S.headingTwo}>Kostnadsvariant:</Text>
            <ScrollView horizontal={true} contentContainerStyle={{ gap: 24 }}>
              {intervalPeriods.map((period, i) => (
                <Button
                  title={period}
                  type='clear'
                  titleStyle={{ color: "black" }}
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
            {service.subscription_tiers?.map((tier, i) => (
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
            style={styles.createNewService}
            onPress={() => setCreating(true)}
          >
            <Text style={[S.headingTwo, { color: S.onBackgroundText.color }]}>
              Skapa eget pris...
            </Text>
            <Image source={addSolidBlack} style={{ height: 60, width: 60 }} />
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
    backgroundColor: S.primaryColor.backgroundColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
    gap: 16,
    borderRadius: S.borderRadiusSmall.borderRadius,
  },
  createNewService: {
    backgroundColor: S.primaryColor.backgroundColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    width: "100%",
    borderRadius: S.borderRadiusSmall.borderRadius,
  },
  textInput: {
    borderRadius: S.borderRadiusSmall.borderRadius,
    backgroundColor: S.primaryColor.backgroundColor,
    borderWidth: 1,
    padding: 10,
  },
});
