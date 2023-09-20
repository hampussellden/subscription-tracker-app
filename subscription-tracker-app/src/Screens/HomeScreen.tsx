import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ActiveSubscriptionsContainer from "../Components/ActiveSubscribstionsContainer";
import { supabase } from "../../lib/supabase";
import Onboarding from "../Components/Onboarding";
import NewsContainer from "../Components/NewsContainer";
import UsersContainer from "../Components/UsersContainer";

export type Interval_periods =
  | "monthly"
  | "quarterly"
  | "semi-annual"
  | "annual";
export type SubscriptionTier = {
  id: number;
  name: string;
  price: number;
  service_id: number;
  interval_period: Interval_periods;
};
export type Service = {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  banner: string | null;
  category_id: number | null;
  subscription_tiers?: SubscriptionTier[];
};
export type Category = {
  id: number;
  name: string | null;
};
export type Subscription = {
  id: number;
  user_id: number;
  service_id: number;
  subscription_tier_id: number;
  renewal_date: string;
  active: boolean;
  created_at: string;
  service?: Service;
  subscription_tier?: SubscriptionTier;
  user?: User;
};
export type User = {
  id: number;
  name: string;
  profile_id: string;
  created_at: string;
  avatar_url: string;
};

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
            // if (i == 0) {
            //   setSelectedUser(user as User);
            // }
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
      if (selectedUser != null) {
        const { data: subscriptions, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", selectedUser.id);
        if (error) {
          console.log(error);
        }
        if (subscriptions) {
          setSubscriptions(subscriptions as Subscription[]);
        }
      } else {
        const { data: subscriptions, error } = await supabase
          .from("subscriptions")
          .select("*")
          .in("user_id", userIds);
        if (error) {
          console.log(error);
        }
        if (subscriptions) {
          setSubscriptions(subscriptions as Subscription[]);
        }
      }
    };
    fetchSubscriptions();
  }, [selectedUser, userIds]);
  //fetching of subscription_tiers
  useEffect(() => {
    const fetchSubscriptionTiers = async () => {
      const { data: subscriptionTiers, error } = await supabase
        .from("subscription_tiers")
        .select("*");
      if (error) {
        console.log(error);
      }
      if (subscriptionTiers) {
        setSubscriptionTiers(subscriptionTiers as SubscriptionTier[]);
      }
    };
    fetchSubscriptionTiers();
  }, [subscriptions]);
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
    if (tosAccepted != null) {
      setLoading(false);
    }
  }, [tosAccepted]);
  const handlePress = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ tos_accepted: true })
      .eq("id", session.user.id);

    if (error) {
      // console.log(error);
    }
    setTosAccepted(true);
  };

  return (
    <>
      {loading && <Text>Loading...</Text>}
      {!loading &&
        (!tosAccepted ? (
          //   props.navigation.navigate("Onboard", { session: session })
          <Onboarding session={session} onClick={handlePress} />
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.main}>
              {/* price overview */}
              {/* upcoming payments */}
              <NewsContainer />
              <UsersContainer users={users} />
              <ActiveSubscriptionsContainer
                categories={categories}
                subscriptions={subscriptions}
                services={services}
                subscriptionTiers={subscriptionTiers}
                users={users}
              />
            </ScrollView>
          </>
        ))}
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 16,
    gap: 16,
  },
});
