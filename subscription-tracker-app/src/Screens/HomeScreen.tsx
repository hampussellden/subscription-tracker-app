import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { supabase } from "../../lib/supabase";
import ActiveSubscription from "../Components/ActiveSubscription";
import { arrowBack } from "../images/images";

const exampleService = {
  name: "Netflix",
  icon: arrowBack,
  color: "#E50914",
};

const HomeScreen = (props: any) => {
  const session = props.route.params.session;
  return (
    <>
      <ScrollView>
        <ActiveSubscription service={exampleService} />
      </ScrollView>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
