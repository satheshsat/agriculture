import { Injectable } from '@angular/core';
import { FirebaseConfig } from '@ionic-native/firebase-config/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  version: string = '0.0.1';

  constructor(
    private firebaseAnalytics: FirebaseAnalytics,
    private firebaseCrashlytics: FirebaseCrashlytics
  ) { 
    
  }

  loadSettings(){
    this.firebaseCrashlytics.initialise();
  }

  trackEvent( name: string, args: object){
    this.firebaseAnalytics.logEvent(name, args);
  }
}
