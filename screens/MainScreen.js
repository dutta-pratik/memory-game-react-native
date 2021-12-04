import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => alert("Hello, world!")}
        style={{ backgroundColor: "#FFAFAF", borderRadius: 10 }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            padding: 15,
          }}
        >
          New Game
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
