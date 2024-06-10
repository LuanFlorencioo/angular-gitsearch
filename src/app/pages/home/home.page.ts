import { Component } from '@angular/core';
import {
  ApresentationComponent,
  LastUsersComponent,
  SearchInputComponent,
} from '../../components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ApresentationComponent, SearchInputComponent, LastUsersComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
