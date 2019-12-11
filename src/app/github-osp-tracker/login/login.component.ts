import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { GithubV3Api } from '../_services/github-api-v3.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      });

  }

  ngOnInit() {
  }

}
