import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import ActiveSubscriptionsContainer from "../Components/ActiveSubscribstionsContainer";
import { supabase } from "../../lib/supabase";
import Onboarding from "../Components/Onboarding";
import NewsContainer from "../Components/NewsContainer";
import UsersContainer from "../Components/UsersContainer";
import UpcomingPaymentsContainer from "../Components/UpcomingPaymentsContainer";
import PriceOverview from "../Components/PriceOverview";
import S from "../style";
import {
  Subscription,
  Service,
  User,
  Category,
  SubscriptionTier,
} from "../types";
import SingleSubscription from "../Components/SingleSubscription";
import Header from "../Components/Header";
import AddSubscriptionFooter from "../Components/AddSubscriptionFooter";
import { themeContext } from "../Theme";

const HomeScreen = (props: any) => {
  const [reload, setReload] = useState<boolean>(false);
  const [tosAccepted, setTosAccepted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [userIds, setUserIds] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subscriptionTiers, setSubscriptionTiers] = useState<
    SubscriptionTier[]
  >([]);
  const [priceOverviewActive, setPriceOverviewActive] = React.useState(false);
  const [activeSingleSubscription, setActiveSingleSubscription] =
    React.useState<Subscription | false>(false);
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const session = props.route.params.session;
  const profileId = session.user.id;
  const [darkTheme, setDarkTheme] = useContext<any>(themeContext);
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
  }, []);
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
          users.map((user, index) => {
            if (index == 0) {
              setSelectedUser(user as User);
            }
            return user.id;
          })
        );
        setUsers(users);
      }
    };
    fetchUsers();
  }, [tosAccepted]);

  //fetching of subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { data: subscriptions, error } = await supabase
        .from("subscriptions")
        .select(
          `*,
        services (banner, categories(*),color, icon, name),
        subscription_tiers (*),
        users (*)
      `
        )
        .in("user_id", userIds);

      if (error) {
        console.log(error);
      }
      if (subscriptions) {
        setSubscriptions(subscriptions as any[]);
        reload && setReload(false);
      }
    };
    fetchSubscriptions();
  }, [tosAccepted, reload, userIds]);

  //sorting of categories
  useEffect(() => {
    let categories: string[] = [];
    subscriptions.forEach((subscription) => {
      if (
        !categories.includes(
          subscription?.services?.categories?.name as string
        ) &&
        subscription.active
      ) {
        categories.push(subscription?.services?.categories?.name as string);
      }
    });
    setCategories(categories);
  }, [subscriptions]);

  if (props.route.params.accepted != undefined && loading == true) {
    setTosAccepted(props.route.params.accepted);
  }
  //
  useEffect(() => {
    if (tosAccepted == true && subscriptions && users.length > 0) {
      setLoading(false);
    } else {
      setReload(true);
    }
  }, [tosAccepted, subscriptions, users]);
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
  const handleOpenSingleSubscription = (subscription: Subscription) => {
    setActiveSingleSubscription(subscription);
  };
  const handleCloseSingleSubscription = () => {
    setActiveSingleSubscription(false);
    setReload(true);
  };
  const handleChosenUser = (user: User) => {
    if (user.id == chosenUser?.id) {
      setChosenUser(null);
      return;
    }
    setChosenUser(user);
  };
  return (
    <View
      style={{
        backgroundColor: darkTheme
          ? S.primaryColorDark.backgroundColor
          : S.primaryColorLight.backgroundColor,
      }}
    >
      {loading && (
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
      {!loading &&
        (!tosAccepted ? (
          <Onboarding session={session} onClick={handlePress} />
        ) : activeSingleSubscription ? (
          <SingleSubscription
            subscription={activeSingleSubscription}
            navigation={props.navigation}
            closeSingle={handleCloseSingleSubscription}
            activeSingleSub={true}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.main}
            scrollEnabled={!priceOverviewActive}
          >
            {users.length > 0 && (
              <AddSubscriptionFooter
                users={users}
                navigation={props.navigation}
              />
            )}
            {subscriptions.length > 0 && categories.length > 0 && (
              <ActiveSubscriptionsContainer
                chosenUser={chosenUser}
                categories={categories}
                subscriptions={subscriptions}
                handleOpenSingleSubscription={handleOpenSingleSubscription}
              />
            )}
            <UsersContainer
              chosenUser={chosenUser}
              users={users}
              navigation={props.navigation}
              handleChosenUser={handleChosenUser}
            />
            <UpcomingPaymentsContainer subscriptions={subscriptions} />
            <NewsContainer />
            <PriceOverview
              profileId={profileId}
              subscriptions={subscriptions}
              priceOverviewActive={priceOverviewActive}
              onPress={setPriceOverviewActive}
            />
            {!priceOverviewActive && <Header navigation={props.navigation} />}
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
