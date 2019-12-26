import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe 1",
      "Description 1",
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg",
      [new Ingredient("Meat", 5), new Ingredient("Avocado", 3)]
    ),
    new Recipe(
      "A Test Recipe 2",
      "Description 2",
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg",
      [new Ingredient("Potato", 8), new Ingredient("Carrot", 5)]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipe() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
