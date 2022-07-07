import React from "react";

import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator();

import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider } from "native-base";

import DashboardNavigator from "./navigation/DashboardNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

import { AuthContext } from "./Context/AuthContext";

export default function App() {
  const [user, setUser] = useState({});

  const [userToken, setUserToken] = useState(null);

  const authContext = React.useMemo(() => ({
    signIn: (data) => {
      setUserToken("token");
      setUser(data);
    },
    signOut: () => {
      setUserToken(null);
    },
    getUser: () => {
      return user;
    },
  }));

  useEffect(() => {}, []);

  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {userToken !== null ? (
              <RootStack.Screen
                name="DashboardNavigator"
                component={DashboardNavigator}
                initialParams={{ user: user }}
              />
            ) : (
              <RootStack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
