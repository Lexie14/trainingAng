import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { isPlatformBrowser } from "@angular/common";
import { Store } from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // this.authService.autoLogin();
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }
}
