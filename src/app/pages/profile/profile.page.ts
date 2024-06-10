import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GithubApiService } from '../../services';
import { UserCookies } from '../../models/user-cookies';
import { Repo, User } from '../../models/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeftLong,
  faLocationDot,
  faLink,
  faUserGroup,
  faBuilding,
  faArrowUpRightFromSquare,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
})
export class ProfilePage implements OnInit {
  user = {} as User;
  repos = [] as Repo[];
  icons = {
    arrowLeft: faArrowLeftLong,
    locationDot: faLocationDot,
    link: faLink,
    userGroup: faUserGroup,
    building: faBuilding,
    arrowUpRightFromSquare: faArrowUpRightFromSquare,
    codeBranch: faCodeBranch,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookiesService: CookieService,
    private githubApiService: GithubApiService
  ) {}

  ngOnInit(): void {
    const getPath = this.route.snapshot.paramMap.get('username');

    this.githubApiService.fetchUser(getPath!).subscribe({
      next: (value) => {
        const KEY_COOKIES = 'GitSearch | historic';
        const setCookies = (data: UserCookies[]): void => {
          this.cookiesService.set(KEY_COOKIES, JSON.stringify(data), {
            expires: 36000,
          });
        };
        const userCookiesData: UserCookies = {
          username: value.login,
          name: value.name,
          avatar_url: value.avatar_url,
        };
        const hasCookies = this.cookiesService.check(KEY_COOKIES);

        if (hasCookies) {
          const getCookies = this.cookiesService.get(KEY_COOKIES);
          const historic: UserCookies[] = JSON.parse(getCookies);
          const findCurrentUser = historic.find(
            ({ username }) => username === getPath
          );

          const newHistoric: UserCookies[] = findCurrentUser
            ? [
                findCurrentUser,
                ...historic.filter(({ username }) => username !== getPath),
              ]
            : [userCookiesData, ...historic].slice(0, 3);

          setCookies(newHistoric);
        } else {
          setCookies([userCookiesData]);
        }

        const user: User = {
          id: value.id,
          username: value.login,
          avatar_url: value.avatar_url,
          url: value.html_url,
          name: value.name,
          company: value.company,
          blog: value.blog,
          location: value.location,
          bio: value.bio,
          public_repos: value.public_repos,
          followers: value.followers,
          following: value.following,
          created_at: value.created_at,
        };

        this.user = user;
      },
      error: () => {
        this.router.navigate(['']);
      },
    });

    this.githubApiService.fetchUserRepo(getPath!).subscribe({
      next: (value) => {
        const reposData: Repo[] = value.map((repo: any) => {
          const repoData: Repo = {
            id: repo.id,
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            topics: repo.topics,
            created_at: repo.created_at,
            homepage: repo.homepage,
          };
          return repoData;
        });

        this.repos = reposData;
      },
    });
  }
}
