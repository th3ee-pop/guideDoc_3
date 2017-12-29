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
  constructor( public httpService: HttpService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.getParts();
  }
  switchToCheckable(DisArray: Array<any>) {
    DisArray.forEach((d) => {
      d.checked = false;
    });
  }
  handleSymCheckChange(checked: boolean, item: any): void {
    item.checked = checked;
    this.new_symptom.forEach((d) => {
      if (d.Name === item.Name) {
        if (item.checked) {
          this.selected_symptom = d.Id;
          this.new_course = d.Course;
          this.new_complications = [];
          this.new_course.map(c => c.checked = false);
        } else {
          this.new_course = [];
          this.selected_symptom = '';
        }
      } else {
        d.checked = false;
      }
    });
    console.log('hello');
    console.log(this.new_complications);
  }
  handleCourseCheckChange(checked: boolean, item: any): void {
    item.checked = checked;
    this.new_course.forEach((d) => {
      if (d.Name === item.Name) {
        if (item.checked) {
          this.selected_course = d.Id;
          this.new_complications = d.Complications;
          console.log(this.new_complications);
          this.new_complications.map(m => m.checked = false);
        } else {
          this.new_complications = [];
          this.selected_course = '';
        }
      } else {
        d.checked = false;
      }
    });
    console.log('hello');
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
      Sid: this.selected_symptom,
      Course: this.selected_course,
      Gender: sessionStorage.getItem('Gender'),
      Complications: selectedComId,
    };
    console.log(searchParams);
    sessionStorage.setItem('search_params', JSON.stringify(searchParams));
    console.log(JSON.parse(sessionStorage.getItem('search_params')));
  }
}
