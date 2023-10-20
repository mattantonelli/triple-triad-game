import CardList from "@/components/cards/cardList";
import { getCards } from "@/lib/data";

export const metadata = {
  title: "Triple Triad Online - Cards",
  openGraph: {
    title: "Triple Triad Online - Cards"
  }
};

export default async function Cards() {
  const cards = await getCards();

  return (
    <>
      <link rel="preload" as="image" href="https://triad.raelys.com/images/cards/large.png" / >

      <div className="row">
        <div className="col-12 col-lg-10 col-xl-6 offset-lg-1 offset-xl-3">
          <CardList cards={cards} />
        </div>
      </div>
    </>
  );
}