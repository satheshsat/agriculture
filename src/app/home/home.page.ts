import { Component, OnInit } from '@angular/core';
import { CropsService, EventService, AdmobService, SettingsService, FirebaseService } from '../service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  args = {
    'language': 'en',
    'crop_id': 0,
    'page': 1
  };
  settings: any;
  crops: any = [];
  data: any = [];

  spinner = false;
  noData = false;

  constructor( 
    private cropService: CropsService,
    private activatedRoute: ActivatedRoute,
    private event: EventService,
    private admob: AdmobService,
    private settingsService: SettingsService,
    private firebase: FirebaseService
  ) { 
    this.loadData();
    this.loadEvents();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.args.crop_id = +this.activatedRoute.snapshot.paramMap.get('id') || 0;
    if(this.args.crop_id){
      this.loadCrops();
      this.firebase.trackEvent('page_view',{page: "home/"+this.args.crop_id})
    }else
      this.firebase.trackEvent('page_view',{page: "home"})
  }

  loadCrops(){
    this.spinner = true;
    this.noData = false;
    this.cropService.loadCrops(this.args);
    
  }

  loadData(){
    this.settings = this.settingsService.get();
    this.args.language = this.settings.language;
  }

  loadEvents(){

    this.event.subscribe('language', (event)=>{
      this.args.language = event.lang;
      this.args.page = 1;
      this.crops = [];
      this.settings.language = event.lang;
      this.settings.translations = event.translations;
      this.loadCrops();
    })

    this.event.subscribe('theme', (theme)=>{
      this.settings.theme = theme;
    })

    this.event.subscribe('crop', (data)=>{
      this.admob.interstitial();
      this.data = data;
      if(!this.data.length)
        this.noData = true;
      else
        this.noData = false;
      this.spinner=false;
    })

    this.event.subscribe('crops', (data)=>{
      if(data.length==10)
        this.args.page++;
      this.crops = this.crops.concat(data);
      if(!this.crops.length)
        this.noData = true;
      else
        this.noData = false;
      this.spinner=false;
    })
    
  }

  logScrollEnd(){
    if( !this.args.crop_id && !(this.crops.length%10) && !this.spinner ){
      this.loadCrops();
    }
  }

}
