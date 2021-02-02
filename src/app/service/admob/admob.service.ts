import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';

@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  bannerConfig: AdMobFreeBannerConfig = {
    isTesting: false,
    autoShow: true,
    id: "ca-app-pub-6192797665593198/9780558037"
   };

   interstitialConfig: AdMobFreeInterstitialConfig = {
    isTesting: false,
    autoShow: true,
    id: "ca-app-pub-6192797665593198/1663213100"
   };

   interstitialVideoConfig: AdMobFreeRewardVideoConfig = {
    // isTesting: true,
    autoShow: true
   };

  constructor(private admob: AdMobFree) { 
    
  }

  loadConfig(){
    this.admob.banner.config(this.bannerConfig);
    this.admob.interstitial.config(this.bannerConfig);
    // this.admob.rewardVideo.config(this.interstitialVideoConfig);
    this.banner();
  }

  banner(){
    this.admob.banner.prepare()
    .then(() => {
      // banner Ad is ready
      // if we set autoShow to false, then we will need to call the show method here
    })
    .catch(e => console.log(e));
  }

  interstitial(){
    this.admob.interstitial.prepare()
    .then(() => {
      // interstitial Ad is ready
      // if we set autoShow to false, then we will need to call the show method here
    })
    .catch(e => console.log(e));
  }

  interstitialVideo(){
    this.admob.rewardVideo.prepare()
    .then(() => {
      // interstitialVideo Ad is ready
      // if we set autoShow to false, then we will need to call the show method here
    })
    .catch(e => console.log(e));
  }

}
