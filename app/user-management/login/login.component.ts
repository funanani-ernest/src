import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { constants } from 'src/app/shared/global/global.constants';
import { Router } from '@angular/router';
import { setSessionStoragePairs } from 'src/app/shared/global/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  serverErrorMessage: any;
  result: any;
  userId: any = '156b5e89-99ad-47aa-2895-08da80ffdfed';
  captureGoalsTime: any;
  loginForm!: FormGroup;
  holdingArray: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private router: Router) { }


 redirectToSignup() {
    this.router.navigate(['/signup']);
  }
  getFormControl(control: String): AbstractControl {
    return this.loginForm.controls[`${control}`];
  }

  clearFormControlErrors(): void {
    this.getFormControl('Email').setErrors(null);
    this.getFormControl('Password').setErrors(null);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, Validators.required),
    });

    // Clearing errors when making username changes
    this.getFormControl('Email').valueChanges.subscribe(() => {
      this.clearFormControlErrors();
    })

    // Clearing errors when making password changes
    this.getFormControl('Password').valueChanges.subscribe(() => {
      this.clearFormControlErrors();
    })
  }

 

  get currentDateTime(): string {
    let tzoffset = Math.abs(new Date().getTimezoneOffset() * 60000);
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  }

  get isFormInvalid(): boolean { return this.loginForm.invalid; }

  isValid(key: string): boolean { return !this.getFormControl(key).invalid }

  isTouched(key: string): boolean { return this.getFormControl(key).touched; }

  login(): void {
    // display the error message
    this.loginForm.markAllAsTouched();

    // stop the code running
    if (this.isFormInvalid) return;

    this.captureGoalsTime = new Date(Date.now()).getMinutes() + 1;

    // making a backend call
    this.userService
      .authenticate(this.loginForm.value)
      .subscribe((response: any | undefined) => {
        setSessionStoragePairs(
          [
            constants.token,
            constants.username,
            constants.role,
            constants.time,
            "date",
            "times"
          ],
          [
            response?.token,
            `${response?.name} ${response?.surname}`,
            response?.role,
            this.currentDateTime,
            this.currentDateTime,
            this.captureGoalsTime
          ]
        )

        // route to the master layout
        console.log("I am sessionStorage : " + sessionStorage)
        this.router.navigate(['/dashboard']);
      },
        error => {
          this.getFormControl('Email').setErrors({ isUserNameOrPasswordIncorrect: true });
          this.getFormControl('Password').setErrors({ isUserNameOrPasswordIncorrect: true });
          this.loginForm.updateValueAndValidity();
          this.serverErrorMessage = error?.message;
        });

       
  }
}
