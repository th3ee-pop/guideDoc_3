import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http-service';

@Component({
  selector: 'app-result-loop',
  templateUrl: './result-loop.component.html',
  styleUrls: ['./result-loop.component.css']
})
export class ResultLoopComponent implements OnInit {

  list: any[] = [];
  title = 'app';
  current = 1;
  _value: string;
  probableDisease: Array<any>;
  probableDepartment= [];
  selectedSym = ['发烧', '头痛'];
  data = [
    {
      key    : '1',
      name   : '高血压',
      age    : '心血管内科',
      address: 'New York No. 1 Lake Park',
    }, {
      key    : '2',
      name   : '血栓',
      age    : '心血管内科',
      address: 'London No. 1 Lake Park',
    }, {
      key    : '3',
      name   : '血管炎',
      age    : '心血管内科',
      address: 'Sidney No. 1 Lake Park',
    }
  ];
  constructor( private httpService: HttpService) {
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
    this.httpService.getDisease(['s15527', 's70074']).subscribe((res) => {
      console.log(res);
      this.probableDisease = res.Results.PosDis;
      console.log(res.Results.PosDep);
      for (const key in res.Results.PosDep) {
        console.log(key);
        this.probableDepartment.push(res.Results.PosDep[key]);
      }
      console.log(this.probableDepartment);
    });
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
