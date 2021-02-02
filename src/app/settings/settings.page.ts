import { Component, OnInit } from '@angular/core';
import { EventService, SettingsService, FirebaseService } from '../service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings: any;
  darkmode = false;

  constructor( 
    private event: EventService,
    private settingsService: SettingsService,
    private firebase: FirebaseService
  ) { 
    this.loadData();
    this.loadEvents();
    this.firebase.trackEvent('page_view',{page: "settings"})
  }

  ngOnInit() {
  }

  loadData(){
    this.settings = this.settingsService.get();
    if(this.settings.theme.primary=='black'){
      this.darkmode = true;
    }
  }

  loadEvents(){
    this.event.subscribe('language', (event)=>{
      this.firebase.trackEvent('click',{language: event.lang})
      this.settings.language = event.lang;
      this.settings.translations = event.translations;
    })
    this.event.subscribe('theme', (theme)=>{
      this.settings.theme = theme;
    })
  }

  updateLanguage(e){
    this.settings.language = this.settingsService.setLanguage(e.detail.value);
  }

  updateTheme(e){
    this.darkmode = e.detail.checked;
    if(this.darkmode)
      this.settingsService.setTheme({primary:'black',secondary:'black1'});
    else
      this.settingsService.setTheme({primary:'green',secondary:'green1'});
  }

}
