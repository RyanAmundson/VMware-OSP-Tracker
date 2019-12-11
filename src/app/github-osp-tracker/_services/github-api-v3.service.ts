import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Repository } from '../_models/models';
import { Observable } from 'rxjs';



@Injectable()
export class GithubV3Api {

    constructor(private http: HttpClient) {

    }

    getRepositoriesForOrganization(org:string): Observable<Repository[]> {
        return <Observable<Repository[]>>this.http.get(`https://api.github.com/orgs/${org}/repos`,{params:{type:'public'}});
    }

    getProject(projectId:string) {

    }


}