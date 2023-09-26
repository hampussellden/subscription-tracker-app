import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../Components/Header";
import BrowseServices from "../Components/BrowseServices";
import S from "../style";
import { Interval_periods, Service, SubscriptionTier } from "../types";
import { supabase } from "../../lib/supabase";
import BrowseSubscriptionTiers from "../Components/BrowseSubscriptionTiers";
import { Button } from "react-native-elements";
const AddSubscriptionScreen = ({ navigation }: { navigation: any }) => {
  //general state
  const [services, setServices] = useState<Service[]>([]);
  //when using suggested service and tiers
  const [chosenService, setChosenService] = useState<Service | null>(null);
  const [chosenTier, setChosenTier] = useState<SubscriptionTier | null>(null);
  //when creating custom service and tiers
  const [inputValue, setInputValue] = useState<string>("");
  const [costValue, setCostValue] = useState<number | null>(null);
  const [selectedIntervalPeriod, setSelectedIntervalPeriod] =
    useState<Interval_periods>("monthly");
  // ------------------ //
  const intervalPeriods: Interval_periods[] = [
    "monthly",
    "quarterly",
    "semi-annual",
    "annual",
  ];
  //when using the suggested service and tiers
  const handleChooseService = (service: Service | null) => {
    setChosenService(service);
  };
  const handleChooseTier = (tier: SubscriptionTier | null) => {
    setChosenTier(tier);
  };
  //when creating custom service and tiers
  const handleServiceNameChange = (text: string) => {
    setInputValue(text);
  };
  const handleCustomCostInput = (input: string) => {
    setCostValue(Number(input));
  };
  const handleSelectedIntervalPeriod = (period: Interval_periods) => {
    setSelectedIntervalPeriod(period);
  };
  //when creating subscription
  const handleCreateSubscription = async () => {
    console.log("creating subscription");
    if (chosenService) {
      console.log("app name: " + chosenService.name);
    } else if (inputValue) {
      console.log("app name: " + inputValue);
    }
    if (chosenTier) {
      console.log("tier name: " + chosenTier.name);
      console.log("tier price " + chosenTier.price);
      console.log("interval period: " + chosenTier.interval_period);
    } else if (costValue) {
      console.log("tier name: " + costValue);
      console.log("interval period: " + selectedIntervalPeriod);
    }
  };
  //fetch services and there tiers
  useEffect(() => {
    const fetchServices = async () => {
      const { data: services, error } = await supabase
        .from("services")
        .select("*, subscription_tiers(*), categories(*)");

      if (error) {
        console.log(error);
      }
      if (services) {
        setServices(services as Service[]);
      }
    };
    fetchServices();
  }, []);

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{ gap: 16, marginBottom: 40 }}
    >
      {services.length > 0 ? (
        <>
          <Header navigation={navigation} />
          <Text style={S.headingOne}>Lägg till ny tjänst</Text>
          <BrowseServices
            handleChosenService={handleChooseService}
            services={services}
            handleServiceNameChange={() => handleServiceNameChange}
            chosenService={chosenService}
          />
          {chosenService && (
            <>
              <BrowseSubscriptionTiers
                intervalPeriods={intervalPeriods}
                service={chosenService}
                handleCustomCostInput={handleCustomCostInput}
                handleSelectedIntervalPeriod={handleSelectedIntervalPeriod}
                handleChooseTier={handleChooseTier}
                chosenTier={chosenTier}
              />
            </>
          )}
        </>
      ) : (
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      )}
      <Button
        title={"Lägg till"}
        onPress={handleCreateSubscription}
        buttonStyle={{
          backgroundColor: S.onPrimaryColor.backgroundColor,
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      />
    </ScrollView>
  );
};

export default AddSubscriptionScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginTop: 48,
  },
});
