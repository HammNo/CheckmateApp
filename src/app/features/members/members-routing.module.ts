import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';

const routes: Routes = [
  {path : '', component : MembersComponent, children : [
    {path : 'list', component : ListComponent},
    {path : 'add', component : AddComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
