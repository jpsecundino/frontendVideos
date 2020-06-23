import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { AuthGuard } from 'src/security/auth.guard';
import { DAOService } from './shared/dao.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/security/auth.interceptor';
import { PrivateModule } from './private/private.module';
import { SecurityModule } from 'src/security/security.module';
import { IndexModule } from './index/index.module';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('329527231673-83isv13nefctqg8roejknfo4is27jv8o.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    PrivateModule,
    SecurityModule,
    HttpClientModule,
    IndexModule
  ],
  providers: [
    AuthGuard,
    DAOService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
