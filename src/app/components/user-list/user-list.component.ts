import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserHttpService) { }

  users$: Observable<User[]> = this.userService.getAll()

  ngOnInit(): void {
  }

}
