import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Network } from '@ionic-native/network/ngx';
import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader), 
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AppVersion,
    FirebaseConfig,
    FirebaseAnalytics,
    FirebaseCrashlytics,
    Network,
    AdMobFree,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
