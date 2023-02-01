import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

// Components
import Category from "./components/Category";

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
    // Est ce que l'élément sur lequel je clique est déjà dans mon tableau ?
    // Je prend un par un les éléments de mon tableau et je les comparent à l'élmément sur lequel j'ai cliqué
    // Boucle sur mon tableau,                           tab[i]   leurs clefs id            meal

    // AVEC UNE BOUCLE FOR
    // let isPresent = false;
    // for (let i = 0; i < cart.length; i++) {
    //   // console.log(cart[i].id, meal.id);
    //   if (cart[i].id === meal.id) {
    //     isPresent = true;
    //     break;
    //   }
    // }

    // AVEC FIND
    const newCart = [...cart];
    // La méthode find return le premier élément du tableau pour lequel la callback return true. mealPresent sera mon objet trouvé. Ou alors undefined si elle trouve rien
    const mealPresent = newCart.find((elem) => elem.id === meal.id);

    console.log(mealPresent);

    if (mealPresent) {
      // Si oui, je modifie la clef quantity de mon élément
      mealPresent.quantity++;
    } else {
      // Si non : je push un nouvel objet dans mon tableau
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

  // Je peux faire une boucle for pour remplir ma variable total
  // for (let i = 0; i < cart.length; i++) {
  //   // console.log(typeof cart[i].quantity);
  //   // console.log(typeof cart[i].price);
  //   total = total + cart[i].quantity * cart[i].price;
  // }

  console.log(total);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <div className="container hero">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt="Meal" />
      </div>

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
                    <div className="meal-card" key={meal.id}>
                      <div className="meal-cardl-left">
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
                        <span>{meal.title}</span>
                      </div>

                      <span>{(meal.price * meal.quantity).toFixed(2)} €</span>
                    </div>
                  );
                })}
                <p className="total">Total</p>
                <p className="total-price">{total.toFixed(2)} €</p>
              </div>
            ) : (
              <div className="empty">Panier vide</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
