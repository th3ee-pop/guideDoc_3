import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  radioValue = 'm';
  Symptomes: any;
  constructor(public httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }

  searchSymptom(searchText) {
    if ( searchText ) {
      const param = {
        'Name': searchText,
        'Body': '',
        'Gender': this.radioValue
      };
      this.httpService.getSymptomsByBodyParts(param).subscribe((res) => {
        console.log(res);
        this.Symptomes = res.Results;
        console.log(this.Symptomes);
    });
  }
  }

  selectSymptom(symptom: any) {
    console.log(symptom);
    this.httpService.searchPart = symptom;
    sessionStorage.setItem('Gender', this.radioValue);
    sessionStorage.setItem('select_symptom', JSON.stringify(symptom));
    this.router.navigate(['/result_loop']);
  }
}
