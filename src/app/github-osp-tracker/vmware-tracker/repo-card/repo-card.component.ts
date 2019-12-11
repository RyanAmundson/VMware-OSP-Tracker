import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Repository } from '../../_models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubV3Api } from '../../_services/github-api-v3.service';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent implements OnInit {
  @Input() repo: Repository;
  languagesAsync: Observable<Object>;

  constructor(private ghV3Api: GithubV3Api) { 

  }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.repo) {
      this.languagesAsync = this.ghV3Api.grabUrlResource(changes.repo.currentValue.languages_url);
    }
  }

}
