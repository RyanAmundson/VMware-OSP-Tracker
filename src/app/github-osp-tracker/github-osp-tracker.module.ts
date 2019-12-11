import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmwareTrackerComponent } from './vmware-tracker/vmware-tracker.component';
import { VmwareTrackerModule } from './vmware-tracker/vmware-tracker.module';
import { GithubOspTrackerRouting } from './github-osp-tracker.routing';
import { HttpClientModule } from '@angular/common/http';
import { GithubV3Api } from './_services/github-api-v3.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { PipesModule } from '../_pipes/pipes.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    GithubOspTrackerRouting,
    VmwareTrackerModule,
    HttpClientModule,
    FormsModule,
    ClarityModule,
    PipesModule

  ],
  providers: [
    GithubV3Api
  ]
})
export class GithubOspTrackerModule { }
