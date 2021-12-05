import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card({ detail, selectedCard, setSelectedCard }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (!detail.match && !detail.flipped && selectedCard.length <= 2) {
          setSelectedCard([...selectedCard, detail]);
        }
      }}
      disabled={detail.match}
    >
      <View>
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
  card: {
    display: "flex",
    flexDirection: "row",
    innerHeight: "150",
    backgroundColor: "red",
    padding: 5,
  },
  cardBack: {
    width: 80,
    height: 120,
    backgroundColor: "lightblue",
  },
  cardFront: {
    width: 80,
    height: 120,
    backgroundColor: "lightgreen",
  },
});
