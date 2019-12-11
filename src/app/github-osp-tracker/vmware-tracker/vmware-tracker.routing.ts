import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VmwareTrackerComponent } from './vmware-tracker.component';

const routes: Routes = [
  {
    path: 'vmware-tracker',
    component: VmwareTrackerComponent
  },
  {
    path: '',
    redirectTo: 'vmware-tracker',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'vmware-tracker',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VmwareTrackerRouting { }