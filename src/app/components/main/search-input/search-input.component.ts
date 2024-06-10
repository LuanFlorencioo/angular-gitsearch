import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GithubApiService } from '../../../services';
import { CookieService } from 'ngx-cookie-service';
import { UserCookies } from '../../../models/user-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  providers: [CookieService],
})
export class SearchInputComponent {
  iconSearch = faMagnifyingGlass;
  errorSearch = false;
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z](?=.*[a-zA-Z])[a-zA-Z0-9_-]*$/),
    ]),
  });

  constructor(
    private githubApiService: GithubApiService,
    private cookiesService: CookieService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.githubApiService.fetchUser(this.form.value.username!).subscribe({
        next: (value) => {
          const userCookiesData: UserCookies = {
            username: value.login,
            name: value.name,
            avatar_url: value.avatar_url,
          };

          const KEY_COOKIES = 'GitSearch | historic';
          const hasCookies = this.cookiesService.check(KEY_COOKIES);

          if (hasCookies) {
            const getCookies = this.cookiesService.get(KEY_COOKIES);
            const historic: UserCookies[] = JSON.parse(getCookies);

            const alreadyExistsThisUser = historic.some(
              ({ username }) => username === value.login
            );
            this.cookiesService.set(
              KEY_COOKIES,
              JSON.stringify(
                alreadyExistsThisUser
                  ? [
                      userCookiesData,
                      ...historic.filter(
                        ({ username }) => username !== value.login
                      ),
                    ]
                  : [userCookiesData, ...historic].slice(0, 3)
              ),
              {
                expires: 36000,
              }
            );
          } else {
            this.cookiesService.set(
              KEY_COOKIES,
              JSON.stringify([userCookiesData]),
              {
                expires: 36000,
              }
            );
          }

          return this.router.navigate([`/${value.login}`]);
        },
        error: (error) => {
          this.errorSearch = true;
        },
      });
    }
  }
}
