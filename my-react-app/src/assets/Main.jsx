import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [panier, setPanier] = useState([]);
  const [sousTotal, setSousTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const fraisLivr = 2.5;

  const handleClick = (action) => {
    if (action === "plus") {
      setCount(count + 1);
    } else if (action === "minus") {
      setCount(count - 1);
    }
  };

  const addPanier = (meal) => {
    // Vérifier si le plat est déjà dans le panier
    const existingItemIndex = panier.findIndex(
      (item) => item.title === meal.title
    );

    if (existingItemIndex !== -1) {
      // Si le plat existe déjà, j'ajoute le prix du nouveau plat
      const updatedPanier = [...panier];
      updatedPanier[existingItemIndex].price += Number(meal.price);
      setPanier(updatedPanier);
    } else {
      // Si le plat n'existe pas encore
      setPanier([...panier, { title: meal.title, price: Number(meal.price) }]);
    }
  };

  useEffect(() => {
    const calculSousTotal = () => {
      let totalTemp = 0;
      for (let i = 0; i < panier.length; i++) {
        totalTemp = totalTemp + Number(panier[i].price);
      }
      return totalTemp;
    };

    setSousTotal(calculSousTotal());
  }, [panier]);

  useEffect(() => {
    setTotal(sousTotal + fraisLivr);
  }, [sousTotal]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3200");
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <main>
        <section className="col-left">
          <div className="container">
            <div className="Menu">
              {categories.map(
                (category) =>
                  category.meals &&
                  category.meals.length > 0 && (
                    <div className="Category" key={category.name}>
                      <h1>{category.name}</h1>
                      <div className="Meals">
                        {category.meals.map((meal) => (
                          <div
                            className="Meal"
                            key={meal.id}
                            onClick={() => addPanier(meal)}
                          >
                            <div className="Meal-desc">
                              <h2>{meal.title}</h2>
                              <p>{meal.description}</p>
                              <span>{meal.price}€</span>
                              {meal.popular && (
                                <span className="populaire">⭐️ Populaire</span>
                              )}
                            </div>
                            {meal.picture && (
                              <img src={meal.picture} alt={meal.title} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </section>
        <section className="col-right">
          <div className="panier">
            <button className="Validation">Valider mon panier</button>
            <div className="resume-panier">
              {panier.length === 0 ? (
                <p>Votre panier est vide </p>
              ) : (
                <div className="Panier-full">
                  <div className="cart">
                    {panier.map((item, index) => (
                      <div key={index}>
                        <button
                          onClick={() => {
                            handleClick("minus");
                          }}
                        >
                          -
                        </button>
                        {count}
                        <button
                          onClick={() => {
                            handleClick("plus");
                          }}
                        >
                          +
                        </button>
                        {item.title} {item.price}€
                      </div>
                    ))}
                  </div>
                  <div className="sous-total">
                    <div className="sous-total2">
                      <span> Sous-total : </span>
                      <span>{sousTotal}€</span>
                    </div>
                    <div className="frais-livr">
                      <span> Frais de livraison : </span>
                      <span>{fraisLivr}€</span>
                    </div>
                  </div>

                  <div className="total">
                    <span>Total : </span> <span>{total}€ </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Main;
