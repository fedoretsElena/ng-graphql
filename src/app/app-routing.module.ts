import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent, ProjectDetailsComponent } from './components';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'projects'
}, {
  path: 'projects',
  component: ProjectsComponent,
  // children: [{
  //   path: ':id',
  //   component: ProjectDetailsComponent
  // }]
}, {
  path: 'projects/:id',
  component: ProjectDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
