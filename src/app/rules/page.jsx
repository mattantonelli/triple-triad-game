export default function Rules() {
  return (
    <div className="row">
      <div className="col-12 col-lg-10 col-xl-6 offset-lg-1 offset-xl-3">
        <div className="card shadow">
          <h3 className="card-header">Advanced Rules</h3>
          <div className="card-body">
            <h4>Chaos</h4>
            <p>
              The card you play each turn will be selected at random.
            </p>


            <h4>Fallen Ace</h4>
            <p>
              A&apos;s can be flipped by 1&apos;s.
            </p>


            <h4>Order</h4>
            <p>
              You must play cards from your deck in order.
            </p>


            <h4>Plus</h4>
            <p>
              If the numbers of two or more cards have the same total when added to the numbers
              on the adjacent sides of the card you place, you gain control of every matching card.
              Additionally, any cards captured in this way can Combo to flip adjacent cards
              of lower value.
            </p>


            <h4>Reverse</h4>
            <p>
              Lower values now capture higher values.
            </p>


            <h4>Same</h4>
            <p>
              If the numbers of two or more cards are the same as the numbers on the adjacent sides
              of the card you place, you gain control of every matching card. Additionally, any cards
              captured in this way can Combo to flip adjacent cards of lower value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}