import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ActiveSubscriptionsContainer from "../Components/ActiveSubscribstionsContainer";
import { supabase } from "../../lib/supabase";
import Onboarding from "../Components/Onboarding";
import NewsContainer from "../Components/NewsContainer";
import UsersContainer from "../Components/UsersContainer";
import UpcomingPaymentsContainer from "../Components/UpcomingPaymentsContainer";
import PriceOverview from "../Components/PriceOverview";
import {
  Subscription,
  Service,
  User,
  Category,
  SubscriptionTier,
} from "../types";

const HomeScreen = (props: any) => {
  const [tosAccepted, setTosAccepted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [userIds, setUserIds] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscriptionTiers, setSubscriptionTiers] = useState<
    SubscriptionTier[]
  >([]);
  const session = props.route.params.session;
  const profileId = session.user.id;
  //fetching of users on the authenticated profile
  useEffect(() => {
    const fetchUsers = async () => {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("profile_id", profileId);
      if (error) {
        console.log(error);
      }
      if (users) {
        setUserIds(
          users.map((user, i) => {
            if (i == 0) {
              setSelectedUser(user as User);
            }
            return user.id;
          })
        );
        setUsers(users);
      }
    };
    fetchUsers();
  }, []);
  //fetching of services
  useEffect(() => {
    const fetchServices = async () => {
      const { data: services, error } = await supabase
        .from("services")
        .select("*");
      if (error) {
        console.log(error);
      }
      if (services) {
        setServices(services as Service[]);
      }
    };
    fetchServices();
  }, []);
  //fetching of categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");
      if (error) {
        console.log(error);
      }
      if (categories) {
        setCategories(categories);
      }
    };
    fetchCategories();
  }, []);
  //fetching of subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { data: subscriptions, error } = await supabase
        .from("subscriptions")
        .select(
          `*,
        services (*),
        subscription_tiers (*),
        users (*)
      `
        )
        .in("user_id", userIds);

      if (error) {
        console.log(error);
      }
      if (subscriptions) {
        console.log("subs: " + subscriptions);

        setSubscriptions(subscriptions as any[]);
      }
    };
    fetchSubscriptions();
  }, [tosAccepted]);
  if (props.route.params.accepted != undefined && loading == true) {
    setTosAccepted(props.route.params.accepted);
  }
  //fetching of tos_accepted
  useEffect(() => {
    const fetchTos = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("tos_accepted")
        .eq("id", session?.user.id);

      if (data) {
        setTosAccepted(data[0].tos_accepted);
      }
      if (error) {
        console.log(error);
      }
    };
    fetchTos();
  }, [loading]);
  useEffect(() => {
    if (tosAccepted == true && subscriptions.length > 0) {
      setLoading(false);
    }
  }, [tosAccepted, subscriptions]);
  const handlePress = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ tos_accepted: true })
      .eq("id", session.user.id);

    if (error) {
      console.log(error);
    }
    setTosAccepted(true);
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {!loading &&
        (!tosAccepted ? (
          //   props.navigation.navigate("Onboard", { session: session })
          <Onboarding session={session} onClick={handlePress} />
        ) : (
          <ScrollView contentContainerStyle={styles.main}>
            {subscriptions.length > 0 && categories.length > 0 && (
              <ActiveSubscriptionsContainer
                categories={categories}
                subscriptions={subscriptions}
              />
            )}
            <UsersContainer users={users} />
            <UpcomingPaymentsContainer
              subscriptions={subscriptions}
              services={services}
            />
            <NewsContainer />
            <PriceOverview
              profileId={profileId}
              subscriptions={subscriptions}
              services={services}
              subscriptionTiers={subscriptionTiers}
            />
          </ScrollView>
        ))}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 16,
    gap: 16,
    flexDirection: "column-reverse",
  },
});
