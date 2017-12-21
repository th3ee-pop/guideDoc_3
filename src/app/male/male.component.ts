import {Component, OnInit, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { parts } from './body-parts';

@Component({
  selector: 'app-male',
  templateUrl: './male.component.html',
  styleUrls: ['./male.component.css']
})
export class MaleComponent implements OnInit {

  @Input() sex: number;
  @Input() side: number;
  @Output() selectedParts = new EventEmitter<any>();

  frt_male = new parts().frt_male;
  frt_female = new parts().frt_female;
  bck_parts = new parts().bck;
  frt = this.frt_male.concat(this.frt_female);
  bck = this.bck_parts.concat(this.bck_parts);

  parts=[];

  constructor( private elementRef: ElementRef ) { }

  ngOnInit(){
    // console.log(this.frt);
    // console.log(this.bck);
    this.addClick();
  }

  addClick(){
    let els = this.elementRef.nativeElement.querySelectorAll('path');
    els.forEach((ele)=>{
      ele.addEventListener('click',()=> {
      const id = ele["id"];
      if( this.side == 0){
        let part = this.frt[id.split("_")[1]-1];
        console.log(part);
        this.parts.push(part);
      }else {
        let part = this.bck[id.split("_")[1]-1];
        console.log(part);
        this.parts.push(part);
      }
      this.selectedParts.emit(this.dedupe(this.parts));
      // console.log(id);
    })
  })
  }

  dedupe(array){
    return Array.from(new Set(array));
  }
}
