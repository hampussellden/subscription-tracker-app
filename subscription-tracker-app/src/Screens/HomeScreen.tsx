import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import ActiveSubscriptionsContainer from "./ActiveSubscribstionsContainer";
import { supabase } from "../../lib/supabase";
import Onboarding from "../Components/Onboarding";

const HomeScreen = (props: any) => {
  const [tosAccepted, setTosAccepted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const session = props.route.params.session;
  //   supabase.auth.signOut();
  console.log("loading " + loading);

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
      console.log(error);
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
          <ActiveSubscriptionsContainer />
        ))}
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
