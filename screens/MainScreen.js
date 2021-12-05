import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import { cards } from "../constans";

export default function MainScreen() {
  const [shuffledCards, setShuffledCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [match, setMatch] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState([]);

  /**
   * @function cardShuffleHelper
   * It helps to reshuffle cards
   */
  const cardShuffleHelper = () => {
    const shuffleCards = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffleCards);
  };

  React.useEffect(() => {
    cardShuffleHelper();
  }, []);

  /**
   * @function flipCard
   * It helps to flip the card
   */
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

  /**
   * @function revflipCard
   * It helps to backFlip the card
   */
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

  /**
   * @function cleanSelectedCard
   * It helps to clean the selected card array and increase turn count
   */
  const cleanSelectedCard = () => {
    setTimeout(() => {
      const currentTurn = turns + 1;
      setTurns(currentTurn);
      setSelectedCard([]);
    }, 500);
  };

  /**
   * @function checkSelectedCard
   * It helps to verify if selected card is same or not
   */
  const checkSelectedCard = () => {
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
  };

  React.useEffect(() => {
    if (selectedCard.length > 0) {
      flipCard();
      if (selectedCard.length == 2) {
        checkSelectedCard();
        cleanSelectedCard();
      }
    }
  }, [selectedCard]);

  /**
   * @function resetGame
   * It helps to reset game and points
   */
  const resetGame = () => {
    cardShuffleHelper();
    setMatch(0);
    setTurns(0);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => resetGame()} style={styles.buttonStyle}>
        <Text style={styles.buttonTxt}>New Game</Text>
      </TouchableOpacity>
      <View style={styles.pointTable}>
        <Text style={styles.textDec}>
          Matches: {match} {"  "}
        </Text>
        <Text style={styles.textDec}>Turns: {turns}</Text>
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
  buttonStyle: {
    backgroundColor: "#142F43",
    borderColor: "#FFF",
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonTxt: { fontSize: 20, color: "#fff", padding: 9 },
  container: {
    flex: 1,
    backgroundColor: "#142F43",
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
  textDec: {
    color: "#fff",
  },
});
