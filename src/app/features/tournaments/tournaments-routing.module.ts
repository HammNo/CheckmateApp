import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentsComponent } from './tournaments.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { IsAdminGuard } from 'src/app/core/guards/is-admin.guard';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {path : '', component : TournamentsComponent, children : [
    {path : 'list', component : ListComponent},
    {path : 'add', component : AddComponent, canActivate: [] },
    {path : 'edit/:id', component : EditComponent, canActivate: [] },
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule { }
