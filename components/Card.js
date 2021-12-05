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
          <Text style={styles.cardBack}>{detail.value}</Text>
        ) : (
          <Text style={styles.cardFront}>Memory Game</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardBox: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  cardBack: {
    width: 80,
    height: 120,
    borderRadius: 5,
    backgroundColor: "lightblue",
    fontSize: 40,
    display: "flex",
    textAlignVertical: "center",
    color: "#000",
    textAlign: "center",
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
    textAlignVertical: "center",
  },
});
