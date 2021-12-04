import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Card from "../components/Card";

const cards = [
  { id: 1, value: "A", match: false },
  { id: 9, value: "A", match: false },
  { id: 2, value: "B", match: false },
  { id: 10, value: "B", match: false },
  { id: 3, value: "C", match: false },
  { id: 11, value: "C", match: false },
  { id: 4, value: "D", match: false },
  { id: 12, value: "D", match: false },
  { id: 5, value: "E", match: false },
  { id: 13, value: "E", match: false },
  { id: 6, value: "F", match: false },
  { id: 14, value: "F", match: false },
  { id: 7, value: "G", match: false },
  { id: 15, value: "G", match: false },
  { id: 8, value: "H", match: false },
  { id: 16, value: "H", match: false },
];

export default function MainScreen() {
  const [shuffledCards, setShuffledCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [match, setMatch] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState([]);

  const cardShuffleHelper = () => {
    const shuffleCards = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffleCards);
    setTurns(0);
  };

  React.useEffect(() => {
    cardShuffleHelper();
  }, []);

  React.useEffect(() => {
    if (selectedCard.length == 2) {
      const currentTurn = turns + 1;
      if (
        selectedCard[0].id != selectedCard[1].id &&
        selectedCard[0].value === selectedCard[1].value
      ) {
        const currentMatch = match + 1;
        const updatedCards = shuffledCards.map((card) => {
          if (card.value == selectedCard[0].value) {
            let newCard = Object.create(card);
            newCard.match = true;
            newCard.flipped = true;
            return newCard;
          } else {
            return card;
          }
        });
        setShuffledCards(updatedCards);
        setMatch(currentMatch);
      }
      setTurns(currentTurn);
      setSelectedCard([]);
    }
  }, [selectedCard]);

  const resetGame = () => {
    cardShuffleHelper();
    // setTurns(0);
    setMatch(0);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => resetGame()}
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
      <View>
        <Text>Match: {match}</Text>
        <Text>Turns: {turns}</Text>
      </View>
      <View>
        {shuffledCards.length > 0 ? (
          <View style={styles.cardGrid}>
            {shuffledCards.map((card, i) => {
              return (
                <Card
                  key={card.id}
                  detail={card}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                />
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 15,
  },
  cardGrid: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
