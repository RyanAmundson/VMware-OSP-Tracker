import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VmwareTrackerComponent } from './vmware-tracker/vmware-tracker.component';
import { LoginComponent } from './login/login.component';
import { GithubOspTrackerComponent } from './github-osp-tracker.component';

const routes: Routes = [
  {
    path: '',
   component: GithubOspTrackerComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'vmware-tracker',
    component: VmwareTrackerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubOspTrackerRouting { }