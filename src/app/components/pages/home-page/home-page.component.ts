import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { User } from 'src/app/core/types/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public user: User;

  constructor(
    private store: Store<AppState>
  ) {
    this.user = {
      id: "",
      username: "",
      password: "",
      avatar: "",
      created_at: new Date(),
      updated_at: new Date(),
      token: "",
    }
    store.select('user').subscribe((user: User) => {
      this.user = user
    });
  }

  ngOnInit(): void {
  }

}
