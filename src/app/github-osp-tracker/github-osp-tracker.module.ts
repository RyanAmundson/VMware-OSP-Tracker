import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmwareTrackerComponent } from './vmware-tracker/vmware-tracker.component';
import { VmwareTrackerModule } from './vmware-tracker/vmware-tracker.module';
import { GithubOspTrackerRouting } from './github-osp-tracker.routing';
import { HttpClientModule } from '@angular/common/http';
import { GithubV3Api } from './_services/github-api-v3.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    GithubOspTrackerRouting,
    VmwareTrackerModule,
    HttpClientModule
    
  ],
  providers: [
    GithubV3Api
  ]
})
export class GithubOspTrackerModule { }
