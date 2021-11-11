import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserHttpService
  ) {}

  id: string = this.route.snapshot.params.id;

  selectedUser!: User;

  error: boolean = false;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userService.getById(this.id).subscribe(
      (user) => {
        if (user) {
          this.error = false;
          this.selectedUser = user;
        } else {
          this.error = true;
        }
      },
      (error) => this.error = true,
      () => this.error = false
    );
  }

  clearError(): void {
    this.error = false
  }
}
