import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { NzModalService } from 'ng-zorro-antd';
import { LoopModalComponent } from './loop-modal/loop-modal.component';

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
  probableSymptom: Array<any>;
  originalDepartment: Array<any>;
  resDep: any;
  selectedSym = [];
  notSym = [];
  disLoading = true;
  depLoading = true;

  constructor( public httpService: HttpService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.selectedSym.push(
      {
        name: sessionStorage.getItem('search_part_name'),
        id: sessionStorage.getItem('search_part_id')
      }
      );

    this.httpService.getDisease([sessionStorage.getItem('search_part_id')], []).subscribe((res) => {
      console.log(res);
      this.resDep = res.Results.PosDep;
      this.probableDisease = res.Results.PosDis;
      this.switchToCheckable(this.probableDisease);
      this.probableSymptom = res.Results.PosSym;
      console.log(res.Results.PosDep);
      this.disLoading = false;
      this.depLoading = false;
      for (const key in res.Results.PosDep) {
        console.log(key);
        this.probableDepartment.push(res.Results.PosDep[key]);
      }
      console.log(this.probableDepartment);
      this.originalDepartment = this.probableDepartment;
    });
  }
  switchToCheckable(DisArray: Array<any>) {
    DisArray.forEach((d) => {
      d.checked = false;
    });
  }
  handleCheckChange(checked: boolean, item: any): void {
    item.checked = checked;
    this.probableDisease.forEach((d) => {
      if (d.Name === item.Name) {
        if (item.checked) {
          const newDep = [];
          item.department.forEach((p) => {
            newDep.push(this.resDep[p]);
          });
          console.log(newDep);
          this.probableDepartment = newDep;
        } else {
          this.probableDepartment = this.originalDepartment;
        }
      } else {
        d.checked = false;
      }
    });
    console.log('hello');
  }
  showLoopModal() {
    const subscription = this.modalService.open({
      title: '并发症情况',
      content: LoopModalComponent,
      onOk() {
      },
      onCancel() {
        console.log('Click cancel');
      },
      footer: false,
      componentParams: {
        name: '测试渲染',
        further_symptoms: this.probableSymptom,
      }
    });
    subscription.subscribe((res: any) => {
      console.log(res);
      if (res.HaveSym || res.NotSym) {
        const HaveSym = res.HaveSym;
        const NotSym = res.NotSym;
        const HaveSymId = [];
        const NotHaveSymId = [];
        console.log(HaveSym);
        for (const item of HaveSym) {
          this.selectedSym.push(item);
        }
        for (const item of this.selectedSym) {
          HaveSymId.push(item.id);
        }
        for (const item of NotSym) {
          this.notSym.push(item);
          NotHaveSymId.push(item.id);
        }
        this.getDisease(HaveSymId, NotHaveSymId);
      }
    });
  }
  getDepartment(Id: string) {
    for (const item of this.probableDepartment) {
      if (item.ID === Id) {
        return item;
      }
    }
  }
  getDisease(Sym: Array<any>, notSym: Array<any>) {
    this.disLoading = true;
    this.depLoading = true;
    this.httpService.getDisease(Sym, notSym).subscribe(res => {
      this.disLoading = false;
      this.depLoading = false;
      console.log(res);
      this.probableDisease = res.Results.PosDis;
      this.probableSymptom = res.Results.PosSym;
      this.probableDepartment = [];
      console.log(res.Results.PosDep);
      for (const key in res.Results.PosDep) {
        console.log(key);
        this.probableDepartment.push(res.Results.PosDep[key]);
      }
      console.log(this.probableDepartment);
    });
  }
  hashandleClose(item) {
    const HaveSymId = [];
    const NotHaveSymId = [];
    for (let i = 0; i < this.selectedSym.length; i++) {
      if (this.selectedSym[i].id === item.id) {
        this.selectedSym.splice(i, 1);
      }
    }
    for (const sym of this.selectedSym) {
      HaveSymId.push(sym.id);
    }
    for (const sym of this.notSym) {
      NotHaveSymId.push(sym.id);
    }
    this.getDisease(HaveSymId, NotHaveSymId);
  }

  nothandleClose(item) {
    const HaveSymId = [];
    const NotHaveSymId = [];
    for (let i = 0; i < this.notSym.length; i++) {
      if (this.notSym[i].id === item.id) {
        this.notSym.splice(i, 1);
      }
    }
    for (const sym of this.selectedSym) {
      HaveSymId.push(sym.id);
    }
    for (const sym of this.notSym) {
      NotHaveSymId.push(sym.id);
    }
    this.getDisease(HaveSymId, NotHaveSymId);
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
