import getElement from "./utils/getElement.js";
import { showLoading, hideLoading } from "./utils/toggleLoading.js";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin";
const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const form = getElement(".search-form");
const input = getElement('[name="drink"]');

const showDrinks = async (url) => {
  //Fetch drinks
  const data = await fetchDrinks(url);

  //Display drinks
  const section = await displayDrinks(data);
};

const fetchDrinks = async (url) => {
  showLoading();
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const displayDrinks = ({ drinks }) => {
  hideLoading();
  const section = getElement(".section-center");
  const title = getElement(".title");

  if (!drinks) {
    title.textContent = "No drinks match";
    section.innerHTML = null;
    return;
  } else {
    const newDrinks = drinks
      .map((drink) => {
        const { idDrink: id, strDrink: name, strDrinkThumb: image } = drink;

        return `<a href="drink.html">
    <article class="cocktail" data-id="${id}">
      <img src="${image}" alt="${name}" />
      <h3>${name}</h3>
    </article>
  </a>`;
      })
      .join("");
    hideLoading();
    title.textContent = "";
    section.innerHTML = newDrinks;
    return section;
  }
};

form.addEventListener("keyup", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) {
    return;
  } else {
    showDrinks(`${baseURL}${value}`);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  showDrinks(URL);
});
