import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http-service/http-service";

@Component({
  selector: 'app-body-select',
  templateUrl: './body-select.component.html',
  styleUrls: ['./body-select.component.css']
})
export class BodySelectComponent implements OnInit {

  sex = 0 ;
  side = 0 ;
  part='全身';
  list: any[] = [];
  title = 'app';
  current = 0;
  _value: string;
  data ;
  constructor(public httpService: HttpService){}
  ngOnInit() {
    const params = {
      "Name":"",
      "Body":"bp15500",
      "Gender":"F"
    };
    // this.httpService.getSymptomsByBodyParts(params).subscribe((res)=> {
    //   console.log("work!");
    //   console.log(res);
    // });
  }

  filterOption(inputValue, option) {
    return option.description.indexOf(inputValue) > -1;
  }

  search(ret: any) {
    console.log('nzSearchChange', ret);
  }

  select(ret: any) {
    console.log('nzSelectChange', ret);
  }

  change(ret: any) {
    console.log('nzChange', ret);
  }

  changeSex(num){
    this.sex = num;
  }
  changeSide(num){
    this.side = num
  }
  getParts(event:any){
    console.log(event);
    this.part = event;
    this.httpService.getSymptoms("头疼").subscribe((res)=>{
      console.log(res);
      this.data = res.Results;
    })
  }
}
