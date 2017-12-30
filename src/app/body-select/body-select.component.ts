import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-select',
  templateUrl: './body-select.component.html',
  styleUrls: ['./body-select.component.css']
})
export class BodySelectComponent implements OnInit {

  dic = {
    "c": {
      "bp19": "颈部",
      "bp18": "上臂",
      "bp15": "手部",
      "bp14": "大腿",
      "bp17": "脚踝",
      "bp16": "面部",
      "bp11": "其他",
      "bp10": "眼部",
      "bp13": "腹部",
      "bp12": "腰背部",
      "bp1": "胸部",
      "bp3": "小腿",
      "bp2": "口部",
      "bp5": "下臂",
      "bp4": "鼻部",
      "bp7": "脚部",
      "bp6": "肘部",
      "bp9": "耳部",
      "bp8": "臀部",
      "bp20": "头部"
    },
    "m": {
      "bp42": "头部",
      "bp43": "膝部",
      "bp40": "上臂",
      "bp41": "颈部",
      "bp24": "鼻部",
      "bp25": "下臂",
      "bp26": "肘部",
      "bp27": "脚部",
      "bp21": "胸部",
      "bp22": "口部",
      "bp23": "小腿",
      "bp28": "臀部",
      "bp29": "耳部",
      "bp37": "面部",
      "bp36": "手部",
      "bp35": "大腿",
      "bp34": "髋部",
      "bp33": "腹部",
      "bp32": "腰背部",
      "bp31": "其他",
      "bp30": "眼部",
      "bp39": "腕部",
      "bp38": "脚踝"
    },
    "w": {
      "bp46": "小腿",
      "bp47": "鼻部",
      "bp44": "胸部",
      "bp45": "口部",
      "bp48": "下臂",
      "bp49": "肘部",
      "bp68": "膝部",
      "bp60": "手部",
      "bp61": "面部",
      "bp62": "脚踝",
      "bp63": "腕部",
      "bp64": "脚部",
      "bp65": "上臂",
      "bp66": "颈部",
      "bp67": "头部",
      "bp51": "臀部",
      "bp50": "乳房",
      "bp53": "眼部",
      "bp52": "耳部",
      "bp55": "腰背部",
      "bp54": "其他",
      "bp57": "髋部",
      "bp56": "腹部",
      "bp59": "大腿",
      "bp58": "阴部"
    }
  };

  sex = 0 ;
  side = 0 ;
  part= '头部';
  title = 'app';
  Symptomes: any;

  data ;
  constructor(public httpService: HttpService, private router: Router) {
  }
  ngOnInit() {
    sessionStorage.setItem('Gender','m');
    // this.getParts("bp42");
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
    const gender = this.getGender(this.sex);
    sessionStorage.setItem('Gender', gender);
    sessionStorage.setItem('part', this.dic[gender][0]);
  }
  changeSide(num) {
    this.side = num;
  }
  getParts(event: any) {
    let gender = sessionStorage.getItem('Gender');
    // this.part = this.dic[gender][event];
    sessionStorage.setItem('part', event);
    const params = {
      'Name': '',
      'Body': event,
      'Gender': gender
    };
    console.log(params);
    this.httpService.getSymptomsByBodyParts(params).subscribe((res) => {
      this.Symptomes = res.Results;
      console.log(this.Symptomes);
    });
  }

  selectSymptom(symptom: any) {
    console.log(symptom);
    sessionStorage.setItem('select_symptom', JSON.stringify(symptom));
    this.router.navigate(['/result_loop']);
  }

  getGender = (sex) => {
    if (sex === 0) {
      return 'm';
    }else if ( sex === 1) {
      return 'w';
    }else {
      return 'c';
    }
  }

}
