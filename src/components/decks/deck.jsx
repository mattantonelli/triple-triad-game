import Card from "../cards/card";

export default function Deck({ name, cards }) {
  return (
    <div className="col">
      <div className="card shadow">
        <h5 className="card-header">{name}</h5>
        <div className="card-body d-flex flex-wrap">
          {cards.map((card) => <Card key={card.id} card={card} />)}
        </div>
      </div>
    </div>
  );
}