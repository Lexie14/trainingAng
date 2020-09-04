import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";

import { Recipe } from "./recipe.model";
import * as fromApp from "../store/app.reducer";
import * as RecipesAcions from "../recipes/store/recipe.actions";
import { take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new RecipesAcions.FetchRecipes());
    return this.actions$.pipe(
      ofType(RecipesAcions.SET_RECIPES),
      take(1)
    );
  }
}
