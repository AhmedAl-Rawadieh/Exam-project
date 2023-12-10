  import { Component, Output, EventEmitter } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { HttpClient } from '@angular/common/http';
  import Users from '../models/Users';
  import { ApiService } from '../Service/api.service';
  // Import the email validation service

  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent {
    @Output() closeRegistration = new EventEmitter<void>();
  @Output() minimizeRegistration = new EventEmitter<void>();
  isMinimized = false; // Define the isMinimized property
  signUpForm!: FormGroup;
    errorMessage!: string;
    closePopover() {
      this.closeRegistration.emit();
    }
   
    minimizePopover() {
      this.isMinimized = !this.isMinimized;
    }
    
    constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private httpClient: HttpClient) {} // Inject ApiService

    ngOnInit(): void {
      this.signUpForm = this.formBuilder.group({
        name: ["", Validators.required],
        username: ["", Validators.required,],
        password: ["", Validators.required],
        repeatPassword: ["", [Validators.required]]//, this.matchPasswords.bind(this)]]

      });
    }
    
    // matchPasswords(control: any) {
    //   const password = this.signUpForm.get('password')?.value;
    //   const repeatPassword = control.value;
    
    //   return password === repeatPassword ? null : { mismatch: true };
    // }
  
    signUp() {
      const newUser: Users = this.signUpForm.value;
      newUser.id = -1;

   

      this.apiService.signUp(newUser).subscribe(
        (res: Users) => {
          alert('SIGNUP SUCCESSFUL');
          this.signUpForm.reset();
          this.closePopover();
        },
        (err) => {
          alert(err.error.message);
        }
      );
    }
  }
    