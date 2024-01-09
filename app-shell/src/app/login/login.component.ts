import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  title: string = '';
  copyright: string = '';
  constructor(public auth: AuthService) {
    this.title = 'Management Information System';
    this.copyright = `Ecoba Management Information System ${new Date().getFullYear()}`;
  }
}
