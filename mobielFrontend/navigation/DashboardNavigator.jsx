import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Count from "../screens/dashboard/Count";
import Price from "../screens/dashboard/Price";

const Tab = createBottomTabNavigator();

function DashboardNavigator({ navigation, user }) {
  return (
    <Tab.Navigator
      initialRouteName="Count"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#5c7f67",
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 20,
          right: 20,
          left: 20,
          borderRadius: 16,
        },
        tabBarLabelStyle: { fontSize: 16 },

        tabBarActiveBackgroundColor: "#5c7f67",
      }}
    >
      <Tab.Screen
        name="Count"
        component={Count}
        initialParams={{ user: user }}
        options={{
          tabBarItemStyle: {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          },
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={"ios-egg-sharp"}
              color={focused ? "white" : "#5c7f67"}
              size={size + 5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Price"
        component={Price}
        options={{
          tabBarItemStyle: {
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          },
          // tabBarLabelStyle: ({ focused }) => (focused ? "white" : "red"),
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons
              name="attach-money"
              color={focused ? "white" : "#5c7f67"}
              size={size + 5}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default DashboardNavigator;
