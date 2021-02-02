import { Injectable } from '@angular/core';
import { EventService } from '../Event/event.service';
import { StorageService } from '../storage/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
import { AlertService } from '../alert/alert.service'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings = {
    language: 'en',
    translations: {
      "crops": "Crops",
      "english": "English",
      "tamil": "Tamil",
      "telugu": "Telugu",
      "malayalam": "Malayalam",
      "hindi": "Hindi",
      "language": "Language",
      "cancel": "Cancel",
      "ok": "Ok",
      "noDataFound": "No Data found",
      "back": "Back",
      "settings": "settings",
      "networkDisconnected": "Network Disconnected",
      "update": "Update!",
      "updateMessage": "Please update app and continue"
  },
    theme: {
      'primary': 'green',
      'secondary': 'green1'
    }
  }

  constructor( 
    private network: Network,
    private translate: TranslateService,
    private event: EventService,
    private storage: StorageService,
    private alert: AlertService
  ) { 
    // this.loadSettings();
  }

  loadSettings(){

    this.network.onDisconnect().subscribe(()=>{
      this.alert.toast({ message: this.translate.get('networkDisconnected'), duration: 2000 }).then((toast)=>toast.present())
    })

    this.storage.get('language').then((language)=>{
      if( language ){
        this.settings.language=language;
        this.translate.use(language);
      }else{
        this.translate.use(this.settings.language)
      }
    },(error)=>{
      this.translate.use(this.settings.language);
    });
    this.storage.get('theme').then((theme)=>{
      if( theme ){
        this.settings.theme=theme;
        this.event.publish('theme',theme);
      }
    });

    this.translate.onLangChange.subscribe((event)=>{
      this.settings.translations = event.translations;
      this.event.publish('language',event);
    })
  }

  get(){
    return this.settings;
  }

  setTheme( theme: any ){
    this.storage.set( 'theme', theme );
    this.event.publish('theme',theme);
    return this.settings.theme = theme;
  }

  setLanguage( language: string ){
    this.storage.set( 'language', language );
    this.translate.use(language);
    return this.settings.language = language;
  }


}
