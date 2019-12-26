import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe 1",
      "Description 1",
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg"
    ),
    new Recipe(
      "A Test Recipe 2",
      "Description 2",
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg"
    )
  ];

  getRecipe() {
    return this.recipes.slice();
  }
}
