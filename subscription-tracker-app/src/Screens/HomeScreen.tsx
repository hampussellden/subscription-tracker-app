import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ActiveSubscriptionsContainer from "./ActiveSubscribstionsContainer";

const HomeScreen = (props: any) => {
  return (
    <>
      <ActiveSubscriptionsContainer />
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
