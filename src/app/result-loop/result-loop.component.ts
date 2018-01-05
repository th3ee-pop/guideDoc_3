import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-result-loop',
  templateUrl: './result-loop.component.html',
  styleUrls: ['./result-loop.component.css']
})
export class ResultLoopComponent implements OnInit {
  disLoading = true;
  depLoading = true;
  new_symptom: Array<any>;
  new_course: Array<any>;
  new_complications: Array<any>;
  selected_complications = [];
  selected_symptom = '';
  selected_course = '';
  selectedSymptom: any;
  constructor( public httpService: HttpService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.selectedSymptom = JSON.parse(sessionStorage.getItem('select_symptom'));
    console.log(this.selectedSymptom);
    this.new_symptom = [this.selectedSymptom];
    this.new_complications = this.selectedSymptom.Complications;
   // this.getParts();
  }
  switchToCheckable(DisArray: Array<any>) {
    DisArray.forEach((d) => {
      d.checked = false;
    });
  }
  handleSymCheckChange(checked: boolean, item: any): void {
    item.checked = checked;
    console.log('hello');
    console.log(this.new_complications);
  }
  handleComplications(checked: boolean, item: any): void {
    item.checked = checked;
    if (item.checked) {
      this.selected_complications.push(item);
    } else {
      for (let i = 0; i < this.selected_complications.length; i++) {
        if (item.Id === this.selected_complications[i].Id) {
          this.selected_complications.splice(i, 1);
        }
      }
    }
    console.log(this.selected_complications);
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

  getParts() {
    const gender = sessionStorage.getItem('Gender');
    const part = sessionStorage.getItem('part');
    const params = {
      'Name': '',
      'Body': part,
      'Gender': gender
    };
    console.log(params);
    this.httpService.getSymptomsByBodyParts(params).subscribe((res) => {
      res.Results.map((d) => {
        d.checked = false;
      });
      this.new_symptom = res.Results;
      console.log(this.new_symptom);
    });

  }
  getParams() {
    const selectedComId = [];
    this.selected_complications.forEach(d => selectedComId.push(d.Id));
    console.log(selectedComId);
    const searchParams = {
      Sid: this.selectedSymptom.Id,
      Course: this.selected_course,
      Gender: sessionStorage.getItem('Gender'),
      Complications: selectedComId,
    };
    console.log(searchParams);
    sessionStorage.setItem('search_params', JSON.stringify(searchParams));
    console.log(JSON.parse(sessionStorage.getItem('search_params')));
  }
}
