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
import { Interval_periods, Service, SubscriptionTier, User } from "../types";
import { supabase } from "../../lib/supabase";
import BrowseSubscriptionTiers from "../Components/BrowseSubscriptionTiers";
import { Button } from "react-native-elements";
import ChooseUserContainer from "../Components/ChooseUserContainer";
import NotificationsForNewSub from "../Components/NoficationsForNewSub";
import DatePicker from "../Components/DatePicker";
const AddSubscriptionScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  //general state
  const [services, setServices] = useState<Service[]>([]);
  //notification state
  const [notificationEnabled, setNotificationEnabled] =
    useState<boolean>(false);
  //user state setup
  const users = route.params.users as User[];
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  //when using suggested service and tiers
  const [chosenService, setChosenService] = useState<Service | null>(null);
  const [chosenTier, setChosenTier] = useState<SubscriptionTier | null>(null);
  //when creating custom service and tiers
  const [inputValue, setInputValue] = useState<string>("");
  const [costValue, setCostValue] = useState<number | null>(null);
  const [selectedIntervalPeriod, setSelectedIntervalPeriod] =
    useState<Interval_periods>("monthly");
  //date picker
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  // ------------------ //
  const intervalPeriods: Interval_periods[] = [
    "monthly",
    "quarterly",
    "semi-annual",
    "annual",
  ];
  //user pick handler
  const handleChooseUser = (user: User | null) => {
    setChosenUser(user);
  };
  //notifaications
  const handleToggleNotification = () => {
    setNotificationEnabled((previousState) => !previousState);
  };
  //handlers for when using the suggested service and tiers
  const handleChooseService = (service: Service | null) => {
    setChosenService(service);
  };
  const handleChooseTier = (tier: SubscriptionTier | null) => {
    setChosenTier(tier);
  };
  //handlers for when creating custom service and tiers
  const handleServiceNameChange = (text: string) => {
    console.log(text);
    setInputValue(text);
  };
  const handleCustomCostInput = (input: string) => {
    setCostValue(Number(input));
  };
  const handleSelectedIntervalPeriod = (period: Interval_periods) => {
    setSelectedIntervalPeriod(period);
  };
  //handle date change
  const formatDateToString = (date: Date): string => {
    const currentDate = date;
    console.log(currentDate);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const handleDateChange = (event: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  //when creating subscription
  const handleCreateSubscription = async () => {
    const createNewSubscription = async () => {
      console.log(
        inputValue,
        costValue,
        chosenUser,
        date,
        selectedIntervalPeriod
      );
      if (chosenTier && chosenUser && chosenService && date) {
        const { data: subscription, error } = await supabase
          .from("subscriptions")
          .insert({
            user_id: chosenUser?.id,
            service_id: chosenService?.id,
            subscription_tier_id: chosenTier?.id,
            renewal_date: formatDateToString(date),
            notifications_enabled: notificationEnabled,
            active: true,
          })
          .select();
        if (error) {
          console.log(error);
        }
        if (subscription) {
          navigation.navigate("Home", { reload: true });
        }
      } else if (
        inputValue &&
        costValue &&
        chosenUser &&
        date &&
        selectedIntervalPeriod
      ) {
        const { data: service, error } = await supabase
          .from("services")
          .insert({ name: inputValue, icon: "bookMark.png", category_id: 2 })
          .select();
        if (error) {
          console.log(error);
        }
        if (service) {
          const { data: subscription_tier, error } = await supabase
            .from("subscription_tiers")
            .insert({
              service_id: service[0].id,
              name: inputValue,
              price: costValue,
              interval_period: selectedIntervalPeriod,
            })
            .select();
          if (error) {
            console.log(error);
          }
          if (subscription_tier) {
            const { data: subscription, error } = await supabase
              .from("subscriptions")
              .insert({
                user_id: chosenUser?.id,
                service_id: service[0].id,
                subscription_tier_id: subscription_tier[0].id,
                renewal_date: formatDateToString(date),
                notifications_enabled: notificationEnabled,
                active: true,
              })
              .select();
            if (error) {
              console.log(error);
            }
            if (subscription) {
              console.log(subscription);
            }
          }
        }
      }
    };
    createNewSubscription();
  };
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
    <ScrollView style={styles.wrapper} contentContainerStyle={{ gap: 16 }}>
      {services ? (
        <>
          <Header navigation={navigation} />
          <Text style={S.headingOne}>Lägg till ny tjänst</Text>
          <BrowseServices
            handleChosenService={handleChooseService}
            services={services}
            handleServiceNameChange={handleServiceNameChange}
            chosenService={chosenService}
            inputValue={inputValue}
          />
          {chosenService && (
            <>
              <BrowseSubscriptionTiers
                intervalPeriods={intervalPeriods}
                service={chosenService}
                handleCustomCostInput={handleCustomCostInput}
                handleSelectedIntervalPeriod={handleSelectedIntervalPeriod}
                selectedIntervalPeriod={selectedIntervalPeriod}
                handleChooseTier={handleChooseTier}
                chosenTier={chosenTier}
                costValue={costValue}
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

      <View style={{ alignSelf: "flex-start", marginVertical: 16 }}>
        <DatePicker date={date} handleDateChange={handleDateChange} />
      </View>

      {users.length > 0 && (
        <View>
          <Text style={[S.headingOne, { marginBottom: 16 }]}>
            Välj användare
          </Text>
          <ChooseUserContainer
            users={users}
            handleChooseUser={handleChooseUser}
            chosenUser={chosenUser}
          />
        </View>
      )}

      <NotificationsForNewSub
        handleToggleNotification={handleToggleNotification}
      />
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
    marginBottom: 60,
  },
});
