import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { EventService } from '../Event/event.service';

@Injectable({
  providedIn: 'root'
})
export class CropsService {

  constructor( 
    private api: ApiService,
    private event: EventService,
  ) { 

  }

  loadCrops( args: object ){
    this.api.get('crops',args).subscribe((data)=>{
      if(args['crop_id'])
        this.event.publish('crop',data)
      else
        this.event.publish('crops',data)
    },(error)=>{
      if(args['crop_id'])
        this.event.publish('crop',[])
      else
        this.event.publish('crops',[])
    });
  }

}
