import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Recipe } from "../recipe.model";
import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../store/recipe.actions";
import { map, switchMap } from "rxjs/operators";
import * as ShoppingListAcions from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipeSelected: Recipe;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params["id"];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select("recipes");
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        this.recipeSelected = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      new ShoppingListAcions.AddIngredients(this.recipeSelected.ingredients)
    );
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(["/recipes"]);
  }
}
