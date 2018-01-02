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
  searchParams: any;
  selectedSymptom: any;
  relatedDisease = [];
  posDep: any;

  constructor(public httpService: HttpService, private router: Router) {
  }
  ngOnInit() {
    this.searchParams = JSON.parse(sessionStorage.getItem('search_params'));
    this.selectedSymptom = JSON.parse(sessionStorage.getItem('select_symptom'));
    console.log(this.searchParams);
    this.httpService.getDiagnosis(this.searchParams).subscribe(res => {
      console.log(res);
      res.Reaults.PosDis.map(d => d.expand = false);
      this.relatedDisease = res.Reaults.PosDis;
      this.posDep = res.Reaults.PosDep;
    });
  }
  getKnowledge(Id: string) {
    this.httpService.getKnowledge(Id).subscribe(res => console.log(res)
    );
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
