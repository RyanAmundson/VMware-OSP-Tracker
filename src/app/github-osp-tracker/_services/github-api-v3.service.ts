import { Injectable } from "@angular/core";
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Repository } from '../_models/models';
import { Observable } from 'rxjs';
import * as seedrandom from 'seedrandom';
import { distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';



@Injectable()
export class GithubV3Api {
    rng = seedrandom();
    AUTH_URL = 'https://github.com/login/oauth/authorize';
    REDIRECT_URI = 'http://localhost:4200/github-trackers/login';
    CLIENT_ID = '451f0f7988cb61d80741';
    DEFINITELY_NOT_A_SECRET = 'cc05d870e5314e6288cda72277ba4926ffbdb59d'; // <.<   >.>  
    RANDOM_NUMBER = this.rng();

    simpleCache: Map<string, any> = new Map();

    constructor(private http: HttpClient) {

    }

    authorize() {
        window.location.href = `${this.AUTH_URL}?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&state=${this.RANDOM_NUMBER}`;
    }

    getOauthToken(code: string) {
        this.http.put(`https://github.com/login/oauth/access_token`, {
            client_id: this.CLIENT_ID,
            client_secret: this.DEFINITELY_NOT_A_SECRET,
            code: code,
            state: this.RANDOM_NUMBER
        }).subscribe((accessToken) => {
            console.log(accessToken);
        }, error => {
            console.error("Unable to get authToken for provided code.");
        })

    }

    getRepositoriesForOrganization(org: string): Observable<Repository[]> {
        return <Observable<Repository[]>>this.http.get<Repository[]>(`https://api.github.com/orgs/${org}/repos?page=1&per_page=20&client_id=${this.CLIENT_ID}&client_secret=${this.DEFINITELY_NOT_A_SECRET}`, { params: { type: 'public' } })
            .pipe(
                tap((v) => {
                    console.log(v)
                }),
                shareReplay(1)// TODO: check on this timeWindow parameter...
            );
    }

    grabUrlResource(url) {
        if(this.simpleCache.has(url)) {
            return this.simpleCache.get(url);
        } else {
            return this.http.get(url, {
                params: {
                    client_id: this.CLIENT_ID,
                    client_secret: this.DEFINITELY_NOT_A_SECRET,
                }
            }).pipe(
                tap((res) => {
                    this.simpleCache.set(url, res);
                })
            )
        }
    }


}