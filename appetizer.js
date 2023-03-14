const breakfastUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast";

console.log(breakfastUrl)

let breakfastPage = document.getElementById("breakfast-page");

function displayBreakfastMeals(meals) {
  meals.forEach((meal) => {
    // Create elements to display meal details on page
    let div = document.createElement("div");
    let title = document.createElement("h2");
    let image = document.createElement("img");
    let summary = document.createElement("p");
    let instructions = document.createElement("p");

    title.textContent = meal.strMeal;
    image.src = meal.strMealThumb;
    summary.textContent = meal.strInstructions;

    // Create ingredients list for current meal
    let ingredientsList = document.createElement("ul");
    for (let i = 1; i <= 20; i++) {
      let ingredient = meal["strIngredient" + i];
      let measure = meal["strMeasure" + i];

      // Stop loop when no more ingredients are available
      if (!ingredient) {
        break;
      }

      let li = document.createElement("li");
      li.textContent = `${measure} ${ingredient}`;
      ingredientsList.appendChild(li);
    }

    instructions.innerHTML = `
      <p><strong>Ingredients:</strong></p>
      ${ingredientsList.outerHTML}
    `;

    // Add meal elements to page
    div.appendChild(title);
    div.appendChild(image);
    div.appendChild(summary);
    div.appendChild(instructions);

    breakfastPage.appendChild(div);
  });
}

fetch(breakfastUrl)
  .then((response) => response.json())
  .then((data) => {
    let breakfastMeals = data.meals;
    displayBreakfastMeals(breakfastMeals);
  })
  .catch((error) => console.log(error));


