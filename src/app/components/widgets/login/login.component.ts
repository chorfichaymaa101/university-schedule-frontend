import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { gapi } from 'gapi-script';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private cookieService: CookieService
  ) {}

  googleAuth: any;

  ngOnInit(): void {
    this.initializeGoogleAuth();
  }

  initializeGoogleAuth(): void {
    gapi.load('auth2', () => {
      gapi.auth2
        .init({
          client_id: '868806523294-jngbc1tel77o9352h52og9c14u8hrt5j.apps.googleusercontent.com',
          scope: 'profile email'
        })
        .then((auth: any) => {
          this.googleAuth = auth;
          console.log('Google Auth Initialized');
        })
        .catch((error: any) => {
          console.error('Google Auth Initialization Failed:', error);
          Swal.fire('Error', 'Failed to initialize Google Sign-In. Try again later.', 'error');
        });
    });
  }

  loginWithGoogle(): void {
    if (this.googleAuth) {
      this.googleAuth.disconnect();
     console.log('Sign in using the popup mode ' ,this.googleAuth);
      this.googleAuth.signIn({
        prompt: 'select_account', 
        fetch_basic_profile: true, 
        response_type: 'token id_token', 
      }).then((googleUser: any) => {
        console.log('Sign in using the popup mode ');
        const profile = googleUser.getBasicProfile();
        console.log('Name:', profile.getName());
        console.log('Email:', profile.getEmail());

        const idToken = googleUser.getAuthResponse().id_token;

        this.sendIdTokenToBackend(idToken);
      }).catch((error: any) => {
        console.error('Google Sign-In Failed:', error);
      });
    } else {
      console.error('GoogleAuth is not initialized.');
    }
  }

  sendIdTokenToBackend(idToken: string): void {
    this.authService.authenticateWithGoogle(idToken).subscribe({
      next: (response) => {
        const jwt =  response?.jwt;
        console.log('Authentication successful:', response);
        console.log('Authentication jwt:', jwt);

        this.saveToken(jwt);

        const savedToken = this.getToken();
        if (savedToken) {
          const payload = this.decodeJwt(jwt);
          this.authService.loggedIn = true;
        
          this.cookieService.set('username', payload?.name);
          this.cookieService.set('userId', payload?.sub);
          let role = payload?.role;
          this.cookieService.set('role', role);

        }
          Swal.fire('Success', 'You are now logged in!', 'success');
          this.ngZone.run(() => {
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
          });

          
              },
      error: (error) => {
        console.error('Authentication failed:', error);
        Swal.fire('Error', 'Authentication failed. Please try again.', 'error');
      }
    });
  }

  // Save the token in localStorage
  saveToken(token: string): void {
  try {
    localStorage.setItem("jwt_token", token);
    console.log("Token saved successfully.");
  } catch (error) {
    console.error("Failed to save token:", error);
  }
}

// Retrieve the token from localStorage
  getToken(): string | null {
  try {
    return localStorage.getItem("jwt_token");
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
}

// Decode the payload of a JWT token
 decodeJwt(token: string): any {
  try {
    // Split the JWT into its parts
    const parts = token.split(".");
    console.log(parts.length);
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format.");
    }

    // Decode the payload (second part of the token)
    const payload = JSON.parse(atob(parts[1]));

    console.log("Decoded JWT payload:", payload);
    return payload;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

signUp():void{
  this.ngZone.run(() => {
    this.router.navigate(['/signUp']).then(() => {
      window.location.reload();
    });
  });

}



  
/*
  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  login() {
    if (this.formGroup.invalid) {
      // Mark form controls as touched to display validation errors
      this.formGroup.markAllAsTouched();
      return;
    }

    const username = this.username?.value;
    const password = this.password?.value;

    this.authService.login(username, password).subscribe(response => {
      if(response.authenticated==true){
        console.log(response);

        this.authService.loggedIn = response.authenticated;
        this.authService.isAdmin = response.admin;
        this.authService.isProf = response.enseignant;
        this.authService.name = response.nom + " " + response.prenom;
        this.authService.token = response.token;
        this.authService.id = response.id;


        this.cookieService.set('username', this.authService.name);
        this.cookieService.set('userId', this.authService.id.toString());
        let role = response.admin ? 'Administrateur' : 'Ensignant';
        this.cookieService.set('role', role);
        // refresh page
        window.location.reload();
        this.router.navigateByUrl('/home');

      }else {
        Swal.fire('Echec', 'Nom d\'utilisateur ou mot de passe incorrect', 'error');

      }
        },
        error => {
           Swal.fire('Echec', 'Nom d\'utilisateur ou mot de passe incorrect', 'error');});

  }*/
}
