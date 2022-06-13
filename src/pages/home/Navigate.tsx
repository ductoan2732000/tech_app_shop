import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import ListProduct from "app/pages/product/ProductForm";
import ListOrder from "src/pages/order/List";
import ViewProfile from "app/pages/user/UserForm";
import ShopForm from "src/pages/user/ShopForm";
const Tab = createBottomTabNavigator();

export default function Navigate({ navigation }: { navigation: any }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("focus");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ViewProfile}
        // initialParams={{
        //   clickOptionProfile: clickOptionProfile,
        //   openOption: openOption,
        // }}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.iconTab}
              source={require("src/assets/icon/profile.png")}
            />
          ),
          // headerRight: () => (
          //   <TouchableOpacity onPress={clickOptionProfile}>
          //     <Image
          //       style={styles.iconOption}
          //       source={require("src/assets/icon/menu_option.png")}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        listeners={{
          tabPress: (e) => {
            if (e.type === "tabPress") {
              navigation.setOptions({ title: "Profile" });
            }
            e.preventDefault();
            navigation.navigate("Profile");
          },
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopForm}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.iconTab}
              source={require("src/assets/icon/shop.png")}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (e.type === "tabPress") {
              navigation.setOptions({ title: "Shop" });
            }
            e.preventDefault();
            navigation.navigate("Shop");
          },
        }}
      />
      <Tab.Screen
        name="Product"
        component={ListProduct}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.iconTab}
              source={require("src/assets/icon/product_icon.png")}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (e.type === "tabPress") {
              navigation.setOptions({ title: "Product" });
            }
            e.preventDefault();
            navigation.navigate("Product");
          },
        }}
      />
      <Tab.Screen
        name="Order Tracking"
        component={ListOrder}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.iconTab}
              source={require("src/assets/icon/order.png")}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (e.type === "tabPress") {
              navigation.setOptions({ title: "Order Tracking" });
            }
            e.preventDefault();
            navigation.navigate("Order Tracking");
          },
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  iconTab: {
    width: 18,
    height: 18,
  },
  iconOption: {
    width: 25,
    height: 25,
  },
});
