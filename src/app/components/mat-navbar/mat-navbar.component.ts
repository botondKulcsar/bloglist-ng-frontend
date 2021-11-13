import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.css']
})
export class MatNavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public dialog: MatDialog
    ) {}

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  userSub!: Subscription;

  user?: any

  ngOnInit(): void {
    // const currentUserString = localStorage.getItem('bloglist-user');
    // if (currentUserString) {
    //   this.authService.userLoggedIn.next(JSON.parse(currentUserString))
    // }

    this.userSub = this.authService.userLoggedIn.subscribe(
      user => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
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
    this.authService.logout()
  }

}
