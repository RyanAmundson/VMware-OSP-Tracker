import { Component, OnInit } from '@angular/core';
import { GithubV3Api } from './_services/github-api-v3.service';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-github-osp-tracker',
  templateUrl: './github-osp-tracker.component.html',
  styleUrls: ['./github-osp-tracker.component.scss']
})
export class GithubOspTrackerComponent implements OnInit {

  oauthCode;

  constructor(
    public githubV3Api: GithubV3Api,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.pipe(
      pluck('code'),
    ).
      subscribe((code) => {
        if (Array.isArray(code)) code = code[0];
        this.githubV3Api.getOauthToken(code);
        this.oauthCode = code;
      });

  }
  ngOnInit() {
  }

  authenticate(): void {
    this.githubV3Api.authorize();
  }

}
