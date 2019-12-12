import { Injectable } from "@angular/core";
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Repository } from '../_models/models';
import { Observable, of, from, timer } from 'rxjs';
import * as seedrandom from 'seedrandom';
import { distinctUntilChanged, shareReplay, tap, map, debounceTime, debounce } from 'rxjs/operators';



@Injectable()
export class GithubV3Api {
    rng = seedrandom();
    AUTH_URL = 'https://github.com/login/oauth/authorize';
    REDIRECT_URI = 'http://localhost:4200/github-trackers';
    CLIENT_ID = '451f0f7988cb61d80741';
    DEFINITELY_NOT_A_SECRET = 'cc05d870e5314e6288cda72277ba4926ffbdb59d'; // <.<   >.>  
    RANDOM_NUMBER = this.rng();

    cacheTTL = 1200000;//10 minutes
    simpleCache: Map<any, any> = new Map();
    cacheLastCleared: number = new Date().getTime();

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
            console.error("Unable to get authToken for provided code.", error);
        })

    }

    getRepositoriesForOrganization(org: string): Observable<Repository[]> {
        return <Observable<Repository[]>>this.http.get<Repository[]>(`https://api.github.com/orgs/${org}/repos?page=1&per_page=20&client_id=${this.CLIENT_ID}&client_secret=${this.DEFINITELY_NOT_A_SECRET}`, { params: { type: 'public' } })
            .pipe(
                shareReplay(1)// TODO: check on this timeWindow parameter...
            );
    }

    grabUrlResource(url: string): Promise<any> {
        if (this.simpleCache.has(url)) {
            return Promise.resolve(this.simpleCache.get(url));
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
            ).toPromise();
        }
    }

    filter(searchTerm, criteria, sort, page, itemsPerPage): Observable<any> {
        let qS = searchTerm;
        criteria.forEach((c) => {
            qS = qS + `+${c}`;
        })
        let lookupKey = { q: qS, sort: sort, order: "desc", page: page, per_page: itemsPerPage };
        if (this.simpleCache.has(lookupKey)) {
            return of(this.simpleCache.get(lookupKey));
        } else {
            return this.http
                .get<Repository[]>(`https://api.github.com/search/repositories`,
                    {
                        params: lookupKey
                    })
                .pipe(
                    debounce(() => timer(3000)),
                    tap((res) => {
                        this.simpleCache.set(lookupKey, res);
                        this.checkCacheTime();
                    }),
                );
        }
    }

    checkCacheTime() {
        if (new Date().getTime() - this.cacheLastCleared > 1200000) {
            this.clearCache();
        }
    }

    clearCache() {
        this.simpleCache.clear();
        this.cacheLastCleared = new Date().getTime();
    }


}