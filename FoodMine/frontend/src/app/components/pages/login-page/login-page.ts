import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '../../partials/title/title';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputText } from '../../partials/input-text/input-text';
import { DefaultButton } from '../../partials/default-button/default-button';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, Title, CommonModule, InputText, DefaultButton, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.activateRoute.snapshot.queryParams.returnUrl; //if there is no returnUrl we will redirect to home page
  }

  get formControls() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.userService
      .login({
        email: this.formControls.email.value,
        password: this.formControls.password.value,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl); //if there is no returnUrl we will redirect to home page
      });
  }
}
