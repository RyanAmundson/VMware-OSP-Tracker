import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmwareTrackerComponent } from './vmware-tracker.component';
import { VmwareTrackerRouting } from './vmware-tracker.routing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import {MatIconModule} from '@angular/material/icon';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { RepoCardComponent } from './repo-card/repo-card.component';

@NgModule({
  declarations: [VmwareTrackerComponent, RepoCardComponent],
  imports: [
    CommonModule,
    VmwareTrackerRouting,
    FormsModule,
    ClarityModule,
    MatIconModule,
    PipesModule
    
  ],
  exports: [
    VmwareTrackerComponent
  ]
})
export class VmwareTrackerModule { }
