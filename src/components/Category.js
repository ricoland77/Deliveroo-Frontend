import Meal from "./Meal";

const Category = ({ category, cart, setCart, handleAddToCart }) => {
  // console.log(handleAddTocart);
  // console.log(cart, setCart);
  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="meals-container">
        {category.meals.map((meal) => {
          return (
            <Meal key={meal.id} meal={meal} handleAddToCart={handleAddToCart} />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
