import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { FormsModule } from '@angular/forms';
import { ReactWrapperComponent } from './wrappers/react-wrapper/react-wrapper.component';
import { VueWrapperComponent } from './wrappers/vue-wrapper/vue-wrapper.component';
import { AngularWrapperComponent } from './wrappers/angular-wrapper/angular-wrapper.component';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { TabComponent } from './tab/tab.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TabComponent,
    MainComponent,
    ReactWrapperComponent,
    VueWrapperComponent,
    AngularWrapperComponent,
    CallbackComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
