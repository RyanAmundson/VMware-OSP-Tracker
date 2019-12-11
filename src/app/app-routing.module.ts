import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'github-trackers',
    loadChildren: () => import('./github-osp-tracker/github-osp-tracker.module').then(m => m.GithubOspTrackerModule)
  },
  {
    path: '',
    redirectTo: 'github-trackers',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'github-trackers',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
