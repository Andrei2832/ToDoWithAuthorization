import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizationComponent} from "./components/authorization/authorization.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {MainComponent} from "./components/main/main.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {ListComponent} from "./components/list/list.component";

const routes: Routes = [
  { path: '', component: AuthorizationComponent},
  { path: 'authorization', component: AuthorizationComponent},
  { path: 'registration', component: RegistrationComponent},
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      }
    ]
  },
  { path: '**', component: AuthorizationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
