import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GithubApiService {
  private readonly API_URL = 'https://api.github.com/users';
  constructor(private http: HttpClient) {}

  fetchUser(username: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${username}`);
  }

  fetchUserRepo(username: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${username}/repos`);
  }
}
