import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private userService: UserHttpService,
    private authService: AuthService,
    private router: Router,
    ) { }

  userSub?: Subscription

  visible: boolean = true;

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  ngOnInit(): void {
    this.generateSignupForm();
    this.generateLoginForm();
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  generateSignupForm(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, Validators.minLength(5)]],

    },{ validators: this.checkForMismatch })
  }

  get password(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }
  get rePassword(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  

  checkForMismatch(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password')?.value;
    const rePass = control.get('rePassword')?.value;
    return pass === rePass ? null : { mismatch: true }
  }

  generateLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  registerUser(): void {
    const { username, password, name } = this.signupForm.value;
     this.userSub = this.userService.create({ username, password, name, blogs: [] })
      .subscribe(
        (user: User) => {
          if (user) {
            this.visible = false;
            this.loginForm.patchValue(user)
          }
        },
        (error) => alert(error.message),
        () => {this.signupForm.reset()}
      )
  }

  loginUser(): void {
    const { username, password } = this.loginForm.value;
    this.authService.login( username, password )
      .subscribe(
        userData => {
          if (userData.username) {
            this.loginForm.reset();
          }
        },
        error => alert(error.message),
        () => this.router.navigate(['/blogs'])
      )
  }

}
