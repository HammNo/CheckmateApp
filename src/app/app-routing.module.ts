
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';


const routes: Routes = [
  {path : '', redirectTo : 'home', pathMatch : 'full'},
  { path: 'members', loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule), canActivate: [] },
  { path: 'tournaments', loadChildren: () => import('./features/tournaments/tournaments.module').then(m => m.TournamentsModule), canActivate: [] },
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: 'home', component : HomeComponent },
  // { path: 'login', loadChildren: () => import('./core/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
