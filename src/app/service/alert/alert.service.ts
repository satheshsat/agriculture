import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { 
    
  }

  toast( args: object ){
    return this.toastController.create(args);
  }

  alert( args: object ){
    return this.alertController.create(args);
  }
}
