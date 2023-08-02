import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, DoCheck {

  registerForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngDoCheck(): void {
    console.log(this.registerForm);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [ Validators.required ]],
      surname:  ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      idNumber: [],
      phone: [],
      email: [],
      client: [],
      career: [],
      roles: [],
      learnershipStartDate: [],
      password: []
    });
  }

}
