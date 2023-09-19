import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ActiveSubscriptionsContainer from "../Components/ActiveSubscribstionsContainer";
import { supabase } from "../../lib/supabase";
import Onboarding from "../Components/Onboarding";
import NewsContainer from "../Components/NewsContainer";
import UsersContainer from "../Components/UsersContainer";
import { User } from "@supabase/supabase-js";

export type Service = {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  banner: string | null;
  category_id: number | null;
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
          users.map((user) => {
            return user.id;
          })
        );
        console.log("userIds: " + userIds);
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
          console.log("subscriptions: " + subscriptions);
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
          console.log("subscriptions: " + subscriptions);
          setSubscriptions(subscriptions as Subscription[]);
        }
      }
    };
    fetchSubscriptions();
  }, [selectedUser, userIds]);

  if (props.route.params.accepted != undefined && loading == true) {
    setTosAccepted(props.route.params.accepted);
  }
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
      {!loading &&
        (!tosAccepted ? (
          //   props.navigation.navigate("Onboard", { session: session })
          <Onboarding session={session} onClick={handlePress} />
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.main}>
              {/* price overview */}
              {/* kommande betalningar */}
              <UsersContainer users={users} />
              <NewsContainer />
              <ActiveSubscriptionsContainer
                categories={categories}
                subscriptions={subscriptions}
                services={services}
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
