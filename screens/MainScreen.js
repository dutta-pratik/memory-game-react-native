import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Card from "../components/Card";

const cards = [
  { id: 1, value: "A", match: false, flipped: false },
  { id: 9, value: "A", match: false, flipped: false },
  { id: 2, value: "B", match: false, flipped: false },
  { id: 10, value: "B", match: false, flipped: false },
  { id: 3, value: "C", match: false, flipped: false },
  { id: 11, value: "C", match: false, flipped: false },
  { id: 4, value: "D", match: false, flipped: false },
  { id: 12, value: "D", match: false, flipped: false },
  { id: 5, value: "E", match: false, flipped: false },
  { id: 13, value: "E", match: false, flipped: false },
  { id: 6, value: "F", match: false, flipped: false },
  { id: 14, value: "F", match: false, flipped: false },
  { id: 7, value: "G", match: false, flipped: false },
  { id: 15, value: "G", match: false, flipped: false },
  { id: 8, value: "H", match: false, flipped: false },
  { id: 16, value: "H", match: false, flipped: false },
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

  const flipCard = () => {
    const updatedCards = shuffledCards.map((card) => {
      if (card.id == selectedCard[0].id) {
        let newCard = Object.assign({}, card);
        newCard.flipped = true;
        return newCard;
      }
      if (selectedCard[1] && selectedCard[1].id == card.id) {
        let newCard = Object.assign({}, card);
        newCard.flipped = true;
        return newCard;
      }
      return card;
    });
    setShuffledCards(updatedCards);
  };

  const revflipCard = () => {
    setTimeout(() => {
      const updatedCards = shuffledCards.map((card) => {
        if (card.id == selectedCard[0].id) {
          let newCard = Object.assign({}, card);
          newCard.flipped = false;
          return newCard;
        }
        if (selectedCard[1] && selectedCard[1].id == card.id) {
          let newCard = Object.assign({}, card);
          newCard.flipped = false;
          return newCard;
        }
        return card;
      });
      setShuffledCards(updatedCards);
    }, 1000);
  };

  const cleanSelectedCard = () => {
    setTimeout(() => {
      const currentTurn = turns + 1;
      setTurns(currentTurn);
      setSelectedCard([]);
    }, 500);
  };

  React.useEffect(() => {
    if (selectedCard.length > 0) {
      flipCard();
      if (selectedCard.length == 2) {
        if (
          selectedCard[0].id != selectedCard[1].id &&
          selectedCard[0].value === selectedCard[1].value
        ) {
          const currentMatch = match + 1;
          const updatedCards = shuffledCards.map((card) => {
            if (card.value == selectedCard[0].value) {
              let newCard = Object.assign({}, card);
              newCard.match = true;
              newCard.flipped = true;
              return newCard;
            } else {
              return card;
            }
          });
          setShuffledCards(updatedCards);
          setMatch(currentMatch);
        } else {
          revflipCard();
        }

        cleanSelectedCard();
      }
    }
  }, [selectedCard]);

  const resetGame = () => {
    cardShuffleHelper();
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
            padding: 10,
          }}
        >
          New Game
        </Text>
      </TouchableOpacity>
      <View style={styles.pointTable}>
        <Text>
          Match: {match} {"  "}
        </Text>
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
    maxWidth: 400,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pointTable: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
});
