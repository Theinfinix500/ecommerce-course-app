import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddProductAction } from './actions/add-product.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.auth.connectedUser$.subscribe((user) => {
      if (user === null) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  testNgxsStore() {
    this.store.dispatch(new AddProductAction(new Date().toISOString()));
  }

  logout() {
    this.auth.logout();
  }
}
