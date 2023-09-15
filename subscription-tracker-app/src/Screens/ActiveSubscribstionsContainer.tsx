import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import ActiveSubscription from "../Components/ActiveSubscription";
import { arrowLeft, arrowRight } from "../images/images";

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
const ActiveSubscriptionsContainer = (props: any) => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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
  });
  const filterServices = (category_id: number) => {
    const filteredServices = services.filter(
      (service: Service) => service.category_id === category_id
    );
    return filteredServices;
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.main}>
        {categories.length > 0 &&
          categories.map((category: any) => (
            <>
              <View style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>{category.name}</Text>
                <View style={styles.arrowsContainer}>
                  <Image source={arrowLeft} style={styles.arrows} />
                  <Image source={arrowRight} style={styles.arrows} />
                </View>
              </View>
              <ScrollView
                horizontal={true}
                indicatorStyle={"white"}
                contentContainerStyle={styles.contentContainer}
              >
                {filterServices(category.id).map((service: any) => (
                  <ActiveSubscription service={service} />
                ))}
              </ScrollView>
            </>
          ))}
      </ScrollView>
    </>
  );
};
export default ActiveSubscriptionsContainer;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 16,
    gap: 16,
  },
  contentContainer: {
    gap: 16,
  },
  subTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  arrowsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  arrows: {
    height: 40,
    width: 40,
  },
});
