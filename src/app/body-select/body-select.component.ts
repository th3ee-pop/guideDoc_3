import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-select',
  templateUrl: './body-select.component.html',
  styleUrls: ['./body-select.component.css']
})
export class BodySelectComponent implements OnInit {

  dic =
{
  "男性股沟": "bp20600",
  "全身": "bp12300",
  "背部": "bp25600",
  "胸部": "bp25800",
  "心理": "bp17900",
  "女性生殖": "bp15700",
  "会阴部": "bp11900",
  "臀部": "bp28200",
  "腰部": "bp27300",
  "下肢": "bp10600",
  "盆腔": "bp21200",
  "上肢": "bp10200",
  "骨": "bp30900",
  "其他": "bp12400",
  "颈部": "bp30500",
  "男性生殖": "bp20500",
  "头部": "bp15500",
  "腹部": "bp27700"
};

  sex = 0 ;
  side = 0 ;
  part= '全身';
  list: any[] = [];
  title = 'app';
  current = 0;
  _value: string;
  data ;
  constructor(public httpService: HttpService, private router: Router) {
  }
  ngOnInit() {
    this.getParts("全身");
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

  changeSex(num) {
    this.sex = num;
  }
  changeSide(num) {
    this.side = num;
  }
  getParts(event: any) {
    this.part = event;
    const gender = (this.sex === 0) ? 'M' : 'F';
    sessionStorage.setItem('Gender', gender);
    const params = {
      'Name': '',
      'Body': this.dic[this.part],
      'Gender': gender
    };
    console.log(params);
    this.httpService.getSymptomsByBodyParts(params).subscribe((res) => {
      this.data = res.Results;
    });

  }
  selectSymptom(symptom: any) {
    console.log(symptom);
    this.httpService.searchPart = symptom;
    sessionStorage.setItem('search_part_name', symptom.Name);
    sessionStorage.setItem('search_part_id', symptom.Id);
    this.router.navigate(['/result_loop']);
  }
}
