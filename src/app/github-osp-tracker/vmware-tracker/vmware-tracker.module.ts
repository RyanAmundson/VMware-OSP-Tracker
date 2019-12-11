import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmwareTrackerComponent } from './vmware-tracker.component';
import { VmwareTrackerRouting } from './vmware-tracker.routing';

@NgModule({
  declarations: [VmwareTrackerComponent],
  imports: [
    CommonModule,
    VmwareTrackerRouting
  ]
})
export class VmwareTrackerModule { }
