import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


const Drink = ({ cocktailDB }) => {
  const [currentDrink, setCurrentDrink] = useState(0);
  const [drinkDetails, setDrinkDetails] = useState(false);
  const [drinksDB, setDrinksDB] = useState(cocktailDB);

  useEffect(() => {
    async function fetchCocktailData() {
      const url =
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDrinksDB(data.drinks); 
      } catch (error) {
        console.error("Could not fetch the data:", error);
      }
    }

    if (!drinksDB || drinksDB.length === 0) {
      fetchCocktailData();
    }
  }, [drinksDB]);

  if (!drinksDB || drinksDB.length === 0) {
    return <div>Loading...</div>;
  }

  const nextDrink = () => {
    setCurrentDrink((prev) => (prev + 1) % drinksDB.length);
    setDrinkDetails(false);
  };

  const toggleDetails = () => {
    setDrinkDetails((prev) => !prev);
  };

  return (
    <div className="carousel-container">
      <div className={`carousel-slide ${drinkDetails ? "show-details" : ""}`}>
        <img
          src={drinksDB[currentDrink].strDrinkThumb}
          alt={drinksDB[currentDrink].strDrink}
        />

        <button onClick={toggleDetails}>Details</button>

        {drinkDetails && (
          <div className="drink-details">
            <h3>{drinksDB[currentDrink].strDrink}</h3>
            <p>{drinksDB[currentDrink].strInstructions}</p>
          </div>
        )}
      </div>

      <button onClick={nextDrink}>Next</button>
    </div>
  );
};

Drink.defaultProps = {
  cocktailDB: [],
};

Drink.propTypes = {
  cocktailDB: PropTypes.array,
};

export default Drink;
