import { Component, OnInit, HostListener } from '@angular/core';
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
import { map, tap, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-vmware-tracker',
  templateUrl: './vmware-tracker.component.html',
  styleUrls: ['./vmware-tracker.component.scss'],
  animations: [
    trigger('cardStagger', [
      transition(':enter', [
        query('.repo-card *', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' })),
          ])
        ])
      ]),
      transition(':leave', [
        query('.repo-card *', [
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
  searchString: string = "";
  repositoriesAsync: Observable<Repository[]>;
  sortBy: string = 'updated';
  criteria: string[] = ["org:vmware"];
  totalCount: number = 0;
  loading = false;
  itemsPerPage = 60;
  page = 0;


  @HostListener("scroll", ["$event"])
  onElementScroll(event) {
    console.log(event)
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    console.log(pos)
    if (pos == max) {
      //Do your action here
    }
  }

  constructor(private ghAPI: GithubV3Api) {

  }

  ngOnInit() {
    this.filter();
  }

  filter() {
    this.loading = true;
    this.repositoriesAsync = this.ghAPI.filter(this.searchString, this.criteria, this.sortBy, 1, 1000).pipe(
      tap((res) => this.totalCount = res.total_count),
      map((res) => res.items)
    ).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }

}
