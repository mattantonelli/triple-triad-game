import Card from "../cards/card";

export default function NPC({ npc }) {
  return (
    <div className="col">
      <div className="card shadow">
        <h5 className="card-header">{npc.name}</h5>
        <div className="card-body">
          <dl>
            <dt>Rules</dt>
            <dd>{npc.rules.join(", ")}</dd>

            <dt>Fixed Cards</dt>
            <dd>
              <div className="d-flex flex-wrap">
                {npc.fixed_cards.map((card) => <Card key={card.id} card={card} />)}
              </div>
            </dd>

            <dt>Variable Cards</dt>
            <dd>
              <div className="d-flex flex-wrap">
                {npc.variable_cards.map((card) => <Card key={card.id} card={card} />)}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}