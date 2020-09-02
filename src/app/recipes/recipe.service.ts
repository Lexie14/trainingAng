import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";
@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "A Test Recipe 1",
  //     "Description 1",
  //     "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg",
  //     [new Ingredient("Meat", 5), new Ingredient("Avocado", 3)]
  //   ),
  //   new Recipe(
  //     "A Test Recipe 2",
  //     "Description 2",
  //     "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg",
  //     [new Ingredient("Potato", 8), new Ingredient("Carrot", 5)]
  //   )
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
