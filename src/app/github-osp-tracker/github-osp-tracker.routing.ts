import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VmwareTrackerComponent } from './vmware-tracker/vmware-tracker.component';

const routes: Routes = [
  // {
  //   path: 'vmware-tracker',
  //   loadChildren: () => import('./vmware-tracker/vmware-tracker.module').then(m => m.VmwareTrackerModule)
  // }
  {
    path: 'vmware-tracker',
    component: VmwareTrackerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubOspTrackerRouting { }