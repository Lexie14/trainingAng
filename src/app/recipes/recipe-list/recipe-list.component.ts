import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
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

  @Output() newRecipe = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit() {}

  onRecipeSelected(recipeSelected: Recipe) {
    this.newRecipe.emit(recipeSelected);
  }
}
