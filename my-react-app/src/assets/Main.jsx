import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [categories, setCategories] = useState([]);

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
    <section>
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
                      <div className="Meal" key={meal.id}>
                        <h2>{meal.title}</h2>
                        {/* Placez les deux balises <p> ici, après la balise <h2> */}
                        <p>{meal.description}</p>
                        <p>{meal.price}€</p>
                        {/* Utilisez une expression conditionnelle pour afficher l'image uniquement si meal.picture est défini */}
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
  );
};

export default Main;
