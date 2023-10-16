import CardList from "@/components/cards/cardList";
import { getCards } from "@/lib/data";

export default async function Cards() {
  const cards = await getCards();

  return (
    <div className="row">
      <div className="col-12 col-lg-10 col-xl-6 offset-lg-1 offset-xl-3">
        <CardList cards={cards} />
      </div>
    </div>
  );
}