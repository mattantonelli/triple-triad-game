import Link from "next/link";
import Card from "../cards/card";

export default function NPC({ npc }) {
  return (
    <div className="col">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{npc.name}</h5>
          <Link href="#" className="btn btn-primary">Challenge</Link>
        </div>
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