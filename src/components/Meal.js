import gost from "../assets/images/gost.svg";

const Meal = ({ meal, handleAddToCart }) => {
  // console.log(cart);
  // console.log(setCart);
  // console.log(meal);

  return (
    <div
      className="meal"
      onClick={() => {
        handleAddToCart(meal);
      }}
    >
      <div>
        <p className="title-meal">{meal.title}</p>
        {meal.description ? (
          <div className="description-container">
            <p className="txt-description">{meal.description}</p>
          </div>
        ) : (
          <div className="txt-gost"></div>
        )}

        <div className="price-popular-container">
          <p>{meal.price} €</p>
          {meal.popular && <p style={{ color: "orange" }}>popular</p>}
        </div>
      </div>
      {meal.picture ? (
        <img src={meal.picture} alt="" />
      ) : (
        <img src={gost} alt="" />
      )}
    </div>
  );
};

export default Meal;
