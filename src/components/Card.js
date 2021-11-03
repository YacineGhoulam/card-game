import "./CardStyle.css";

const Card = ({ card, handleClick }) => {
  const cardClick = () => {
    handleClick(card);
  };
  return (
    <div className="card">
      {card.flip ? (
        <img src={card.src} alt="front" />
      ) : (
        <img src="img/cover.png" alt="back" onClick={cardClick} />
      )}
    </div>
  );
};

export default Card;
