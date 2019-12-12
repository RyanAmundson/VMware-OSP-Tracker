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
import { ScrollService } from 'src/app/_services/scroll.service';
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
  itemsPerPage = 25;
  page = 1;
  totalPages = 1;
  heightPerPage:number;



  constructor(private ghAPI: GithubV3Api, private scroll: ScrollService) {
    this.scroll.scrollSubject.subscribe((e) => this.contentScroll(e));
  }

  ngOnInit() {
    this.filter();
  }

  contentScroll(event) {
    // console.log(event)
    //In chrome and some browser scroll is given to body tag
    let pos = event.srcElement.scrollTop + event.srcElement.clientHeight;
    let max = event.srcElement.scrollHeight;
    // console.log(pos,max,event);
    if(pos > max - 100){
      console.log("load more");
      this.page = Math.min((this.page + 1), this.totalPages);
    }
  }

  filter() {
    this.loading = true;
    this.repositoriesAsync = this.ghAPI.filter(this.searchString, this.criteria, this.sortBy, 1, 1000).pipe(
      tap((res) => this.totalCount = res.total_count),
      tap((res) => this.totalPages = Math.ceil(res.total_count / this.itemsPerPage)),
      map((res) => res.items)
    ).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }

}
