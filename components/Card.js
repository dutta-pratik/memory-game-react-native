import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card({ detail, selectedCard, setSelectedCard }) {
  return (
    <TouchableOpacity
      style={styles.cardBox}
      onPress={() => {
        if (!detail.match && !detail.flipped && selectedCard.length <= 2) {
          setSelectedCard([...selectedCard, detail]);
        }
      }}
      disabled={detail.match}
    >
      <View style={styles.card}>
        {detail.flipped ? (
          <Text style={styles.cardBack} nativeID="backview">
            {detail.value}
          </Text>
        ) : (
          <Text style={styles.cardFront} nativeID="frontview">
            Memory Game
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardBox: {
    display: "flex",
    flexDirection: "row",
    innerHeight: "150",
    padding: 5,
  },
  cardBack: {
    width: 80,
    height: 120,
    borderRadius: 5,
    backgroundColor: "lightblue",
    fontSize: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardFront: {
    width: 80,
    height: 120,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    backgroundColor: "#2E4C6D",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
});
