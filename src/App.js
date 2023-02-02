import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

// Components
import Category from "./components/Category";

// Logo
import deliveroo from "./assets/images/deliveroo-logo.svg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--csr6kxjp2bzg.code.run/"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (meal) => {
    const newCart = [...cart];
    const mealPresent = newCart.find((elem) => elem.id === meal.id);
    // console.log(mealPresent);

    if (mealPresent) {
      mealPresent.quantity++;
    } else {
      newCart.push({ ...meal, quantity: 1 });
    }
    setCart(newCart);
  };

  const handleRemoveFromCart = (meal) => {
    const newCart = [...cart];

    const mealPresent = newCart.find((elem) => elem.id === meal.id);
    if (mealPresent.quantity === 1) {
      // Je cherche l'index de l'objet dans mon mon tableau
      const index = newCart.indexOf(mealPresent);
      // console.log(index);
      newCart.splice(index, 1);
    } else {
      mealPresent.quantity--;
    }
    setCart(newCart);
  };

  // Déclaration de mon sous-total
  let total = 0;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <header>
        <div className="container top-header">
          <img
            className="logo-deliveroo"
            src={deliveroo}
            alt="Logo Deliveroo"
          />
        </div>
        <div className="container header">
          <img src={data.restaurant.picture} alt="Meal" />
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
        </div>
      </header>

      <div className="content">
        <div className="container sections-container">
          <section className="left-section">
            {data.categories.map((category, index) => {
              if (category.meals.length !== 0) {
                return (
                  <Category
                    key={index}
                    category={category}
                    handleAddToCart={handleAddToCart}
                  />
                );
              } else {
                return null;
              }
            })}
          </section>
          <section className="right-section">
            {cart.length !== 0 ? (
              <div className="cart">
                {cart.map((meal) => {
                  // J'utilise le fait que mon map parcour déjà mon panier, j'en profite pour remplir mon total
                  total += meal.price * meal.quantity;
                  return (
                    <div>
                      <div className="meal-card" key={meal.id}>
                        <div className="meal-card-left">
                          <button
                            className="btn-more-less"
                            onClick={() => {
                              handleRemoveFromCart(meal);
                            }}
                          >
                            -
                          </button>
                          <span className="counter-meal">{meal.quantity}</span>
                          <button
                            className="btn-more-less"
                            onClick={() => {
                              handleAddToCart(meal);
                            }}
                          >
                            +
                          </button>
                          <span className="title-meal-cart">{meal.title}</span>
                        </div>

                        <span>{(meal.price * meal.quantity).toFixed(2)} €</span>
                      </div>
                    </div>
                  );
                })}
                <p className="total">Total</p>
                <p className="total-price">{total.toFixed(2)} €</p>
              </div>
            ) : (
              <div className="cart-one">
                <p className="title-cart-one">Panier</p>
                <p className="empty-cart">Votre panier est vide</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
