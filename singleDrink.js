import fetchDrinks from "./utils/fetchDrinks.js";
import getElement from "./utils/getElement.js";
import { hideLoading } from "./utils/toggleLoading.js";

const showDrink = async () => {
  const id = localStorage.getItem("drink");

  if (!id) {
    window.location.replace("index.html");
  } else {
    const drink = await fetchDrinks(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    displayDrink(drink);
  }
};

const displayDrink = (data) => {
  hideLoading();

  const drink = data.drinks[0];
  const { strDrinkThumb: image, strDrink: name, strInstructions: desc } = drink;
  const list = [
    drink.strIngredient1,
    drink.strIngredient2,
    drink.strIngredient3,
    drink.strIngredient4,
    drink.strIngredient5,
    drink.strIngredient6,
    drink.strIngredient7,
    drink.strIngredient8,
    drink.strIngredient9,
    drink.strIngredient10,
  ];
  const img = getElement(".drink-img");
  const drinkName = getElement(".drink-name");
  const description = getElement(".drink-desc");
  const ingredients = getElement(".drink-ingredients");

  img.src = image;
  img.alt = name;
  document.title = name;
  drinkName.textContent = name;
  description.textContent = desc;
  ingredients.innerHTML = list
    .map((item) => {
      if (!item) {
        return;
      } else {
        return `<li><i class="fas fa-angle-right"></i> ${item}</li>`;
      }
    })
    .join("");
};

window.addEventListener("DOMContentLoaded", showDrink);
