import ReactDOM from "react-dom";
import CardList from "@/components/cards/cardList";
import { getCards } from "@/lib/data";

export const metadata = {
  title: "Cards"
};

export default async function Cards() {
  ReactDOM.preload("https://triad.raelys.com/images/cards/large.png", { as: "image" });

  const cards = await getCards();

  return (
    <div className="row">
      <div className="col-12 col-lg-10 col-xl-6 offset-lg-1 offset-xl-3">
        <CardList cards={cards} />
      </div>
    </div>
  );
}