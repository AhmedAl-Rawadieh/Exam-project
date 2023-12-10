  import { Component, Output, EventEmitter } from '@angular/core';
  import { ApiService } from '../Service/api.service';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router'; // Import the Router module
  import { HttpClient } from '@angular/common/http';
  import Users from '../models/Users';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    showPopover = false;
    errorMessage = '';

    loginForm!: FormGroup;
    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        username: ["", Validators.required], 
        password: ["", Validators.required], 
      });
    };

    @Output() closeRegistration = new EventEmitter<void>();
    @Output() minimizeRegistration = new EventEmitter<void>();



    constructor(private formBuilder: FormBuilder,private apiService: ApiService, private router: Router) {}

    openPopover() {
      this.showPopover = true;
    }

    closePopover() {
      this.showPopover = false;
    }

    minimizePopover() {
      this.minimizeRegistration.emit();
    }

    login() {
      const username = this.loginForm.value.username as string;
      const password = this.loginForm.value.password as string;
    
      
    
      this.apiService.login(username, password).subscribe(
        (user: Users ) => {
          if (user != null ) {
            console.log('Login successful:', user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('currentUser', user.id.toString());
            
            
            if (user.isAdmin) {
              // User is an admin, navigate to SetupComponent
              this.router.navigate(['/setup']);
            } else {
              // User is not an admin, navigate to ExamComponent
              this.router.navigate(['/exam']);
            }
          }
        },
        (error) => {
        
          if (error.status === 400) {
            alert(error.error.message); 
          } else {
            
            alert('An error occurred during login.');
          }
        }
      );
      }      
  }



