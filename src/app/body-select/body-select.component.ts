import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-select',
  templateUrl: './body-select.component.html',
  styleUrls: ['./body-select.component.css']
})
export class BodySelectComponent implements OnInit {

  list: any[] = [];
  title = 'app';
  current = 0;
  _value: string;
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
