import CardList from "@/components/cards/cardList";
import { getCards } from "@/lib/data";

export default async function Cards() {
  const cards = await getCards();

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <CardList cards={cards} />
      </div>
    </div>
  );
}