import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";
import ListProduct from "src/pages/product/List";
import ListOrder from "src/pages/order/List";
const Tab = createBottomTabNavigator();

export default function Navigate() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  iconTab: {
    width: 18,
    height: 18,
  },
});
