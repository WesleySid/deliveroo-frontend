import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [panier, setPanier] = useState([]);

  const addPanier = (meal) =>
    setPanier([...panier, { title: meal.title, price: meal.price }]);
  const fraisLivr = 2.5;
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
                  // Vérifiez avant de l'afficher
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
                                <span className="populaire">
                                  ⭐️ Populaire{" "}
                                </span>
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
            <button>Valider mon panier</button>
            <div className="resume-panier">
              {panier.length === 0 ? (
                <p>Votre panier est vide </p>
              ) : (
                <div className="Panier-full">
                  <div>
                    {panier.map((item, index) => (
                      <div key={index}>
                        {item.title} {item.price}€
                      </div>
                    ))}
                  </div>
                  <div className="sous-total">sous total </div>
                  <div className="total">total {fraisLivr}€ </div>
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
