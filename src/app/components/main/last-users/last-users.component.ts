import { Component, OnInit } from '@angular/core';
import { UserCookies } from '../../../models/user-cookies';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-last-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './last-users.component.html',
  styleUrl: './last-users.component.scss',
})
export class LastUsersComponent implements OnInit {
  lastUsers: UserCookies[] = [];

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    const KEY_COOKIE = 'GitSearch | historic';
    const hasCookiesSaved = this.cookieService.check(KEY_COOKIE);

    if (hasCookiesSaved) {
      const getLastUsers: UserCookies[] = JSON.parse(
        this.cookieService.get(KEY_COOKIE)
      );
      this.lastUsers = getLastUsers;
    }
  }
}
