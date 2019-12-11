import { Component, OnInit } from '@angular/core';
import { Repository } from '../_models/models';
import { GithubV3Api } from '../_services/github-api-v3.service';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-vmware-tracker',
  templateUrl: './vmware-tracker.component.html',
  styleUrls: ['./vmware-tracker.component.scss'],
  animations: [
    trigger('cardStagger', [
      transition(':enter', [
        query('.card', [
          style({ opacity: 0, transform: 'translateY(-100px)',  }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ]),
      transition(':leave', [
        query('.card', [
          style({ opacity: 1, transform: 'translateY(0)' }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(-100px)' }))
          ])
        ])
      ])
    ])
  ]
})
export class VmwareTrackerComponent implements OnInit {
  searchString: string;
  repositoriesAsync: Observable<Repository[]>;

  constructor(private ghAPI: GithubV3Api) {
    this.repositoriesAsync = this.ghAPI.getRepositoriesForOrganization('vmware');
  }

  ngOnInit() {
  }

}
