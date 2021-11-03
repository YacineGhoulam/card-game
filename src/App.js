import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";

const cardImages = [
  { src: "img/helmet-1.png", flip: false, matched: false },
  { src: "img/potion-1.png", flip: false, matched: false },
  { src: "img/ring-1.png", flip: false, matched: false },
  { src: "img/scroll-1.png", flip: false, matched: false },
  { src: "img/shield-1.png", flip: false, matched: false },
  { src: "img/sword-1.png", flip: false, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        setTimeout(() => {
          setCards((prevCards) => {
            return prevCards.map((selectedCard) => {
              if (
                selectedCard.src == choiceOne.src ||
                selectedCard.src == choiceTwo.src
              ) {
                return { ...selectedCard, flip: false };
              } else {
                return selectedCard;
              }
            });
          });
        }, 400);
      }

      resetTurn();
    }

    console.log(cards);
  }, [choiceOne, choiceTwo]);

  const shuffleCard = () => {
    const cardList = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, key: Math.random() }));

    setCards(cardList);
    setTurn(0);
  };

  const handleClick = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
    setCards((prevCards) => {
      return prevCards.map((selectedCard) => {
        if (selectedCard.key == card.key) {
          return { ...selectedCard, flip: true };
        } else {
          return selectedCard;
        }
      });
    });
  };

  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} key={card.key} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
