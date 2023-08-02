import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { LoginComponent } from '../login/login.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  serverErrorMessage: any = '';

  getFormControl(control: String): AbstractControl {
    return this.signupForm.controls[`${control}`];
  }
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private modalHandler: GoalModalHandlerService<any>
  ) {}

  

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Name: ['', [Validators.required, this.noSpecialCharacters]],
      LastName: ['', [Validators.required, this.noSpecialCharacters]],
      Email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      confirmPassword: ['', Validators.required],
    });
  }
  passwordValidator(control: { value: string }) {
    const pattern = /^(?=.*[!@#$%^&*])(?=.*[A-Z])/;
    return pattern.test(control.value) ? null : { passwordInvalid: true };
  }
  noSpecialCharacters(control: FormControl) {
    const pattern = /^[a-zA-Z ]*$/;
    if (pattern.test(control.value)) {
      return null;
    } else {
      return { specialCharacters: true };
    }
  }

  get isFormInvalid(): boolean {
    return this.signupForm.invalid;
  }

  isValid(controlName: string): boolean {
    return this.signupForm.controls[controlName].valid;
  }

  isTouched(controlName: string): boolean {
    return this.signupForm.controls[controlName].touched;
  }

  arePasswordsMatching(): boolean {
    const password = this.signupForm.get('Password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  areEmailsMatching(): boolean {
    const email = this.signupForm.get('Email')?.value;
    const confirmEmail = this.signupForm.get('confirmEmail')?.value;
    return email === confirmEmail;
  }

  // ... (previous code)

  signup(): void {
    this.signupForm.markAllAsTouched();

    if (!this.signupForm.valid) {
      // If the form is invalid, return early and do not proceed with signup
      return;
    }

    // Connection to backend
    // Place the backend connection logic here
  }

  

  openSignUpModal(): void {
    if (
      this.signupForm.valid &&
      this.arePasswordsMatching() &&
      this.areEmailsMatching()
    ) {
      this.modalHandler.openMdbModal<SignupModalComponent>({
        component: SignupModalComponent,
        data: null,
        ignoreBackdropClick: true,
        width: 50,
      });
    }
  }
}
