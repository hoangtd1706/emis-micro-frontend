import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CallbackComponent } from './callback/callback.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: ':id',
    component: MainComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
