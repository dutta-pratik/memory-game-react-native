import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "./screens/MainScreen";
import { SafeAreaView } from "react-navigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: "Memory Game" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
}
