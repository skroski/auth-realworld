import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
  <h1>Register</h1>

  <form [formGroup]="formRegister"  (ngSubmit)="onSubmit()">
    <div>
      <input type="text" placeholder="Username" formControlName="username" />
    </div>
    <div>
      <input type="text" placeholder="Email" formControlName="email" />
    </div>
    <div>
      <input type="password" placeholder="Password" formControlName="password" />
    </div>
    <div>
      <button type="submit">Sign Up</button>
    </div>
  </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  formRegister = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
   console.log('register');
   this.http
    .post<{user: UserInterface}>('https://api.realworld.io/api/users',
        {
          user: this.formRegister.getRawValue()
        }).subscribe((response) => {
          console.log('response', response);
          localStorage.setItem('token', response.user.token);
        this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
    })

  }
}
