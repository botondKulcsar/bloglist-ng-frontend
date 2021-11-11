import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  userSub!: Subscription;

  user?: any

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('bloglist-user');
    if (currentUserString) {
      this.authService.userLoggedIn.next(JSON.parse(currentUserString))
    }
    
    this.authService.userLoggedIn.subscribe(
      user => {
        if (user) {
          this.user = user;
        }
      },
      err => console.log(err),
      () => {}
    )
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  logout(): void {
    this.authService.userLoggedIn.next(null);
    localStorage.removeItem('bloglist-user');
  }

}
