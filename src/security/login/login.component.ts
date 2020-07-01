import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import {AuthGuard} from '../auth.guard';
import {Router} from '@angular/router';
import { DAOService } from 'src/app/shared/dao.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private authGuard: AuthGuard, private dao: DAOService) { }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      userData => {
        this.authGuard.setCanLoad(true);
        this.router.navigate(['/private/home',userData.email,userData.name]);
      },
      rejection => {
        this.authGuard.setCanLoad(false);
        console.error(rejection);
      }
    );
  }
}
