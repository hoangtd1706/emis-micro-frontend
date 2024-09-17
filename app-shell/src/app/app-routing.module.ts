import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { CallbackComponent } from "./callback/callback.component";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "callback",
    component: CallbackComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: ":id",
    component: MainComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
