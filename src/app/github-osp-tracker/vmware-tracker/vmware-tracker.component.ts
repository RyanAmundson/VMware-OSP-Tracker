import { Component, OnInit } from '@angular/core';
import { Repository } from '../_models/models';
import { GithubV3Api } from '../_services/github-api-v3.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vmware-tracker',
  templateUrl: './vmware-tracker.component.html',
  styleUrls: ['./vmware-tracker.component.scss']
})
export class VmwareTrackerComponent implements OnInit {

  repositoriesAsync: Observable<Repository[]>;

  constructor(private ghAPI:GithubV3Api) {
    this.repositoriesAsync = this.ghAPI.getRepositoriesForOrganization('vmware');
   }

  ngOnInit() {
  }

}
