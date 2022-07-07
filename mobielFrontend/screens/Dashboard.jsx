import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Count from "./dashboard/Count";
import Price from "./dashboard/Price";

const Tab = createBottomTabNavigator();

function Dashboard({ setIsLogged }) {
  return (
    <Tab.Navigator
      initialRouteName="Count"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Count">
        {() => <Count setIsLogged={setIsLogged} />}
      </Tab.Screen>
      <Tab.Screen name="Price" component={Price} />
    </Tab.Navigator>
  );
}

export default Dashboard;
