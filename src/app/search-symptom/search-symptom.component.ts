import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-search-symptom',
  templateUrl: './search-symptom.component.html',
  styleUrls: ['./search-symptom.component.css']
})
export class SearchSymptomComponent implements OnInit {

  list: any[] = [];
  title = 'app';
  current = 1;
  _value= '';
  Symptomes: Array<any>;
  hasSym = sessionStorage.getItem('search_part_id');

  constructor(public httpService: HttpService, private router: Router) {
  }
  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : ''
      });
    }
    console.log(this.list);
    this.httpService.getSymptoms('').subscribe((res) => {
      console.log(res);
      this.Symptomes = res.Results;
      console.log(this.Symptomes);
    });
  }

  searchSymptom() {
    this.httpService.getSymptoms(this._value).subscribe((res) => {
      console.log(res);
      this.Symptomes = res.Results;
      console.log(this.Symptomes);
    });
  }
  selectSymptom(symptom: any) {
    console.log(symptom);
    this.httpService.searchPart = symptom;
    sessionStorage.setItem('search_part_name', symptom.Name);
    sessionStorage.setItem('search_part_id', symptom.Id);
    this.router.navigate(['/result_loop']);
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

}
