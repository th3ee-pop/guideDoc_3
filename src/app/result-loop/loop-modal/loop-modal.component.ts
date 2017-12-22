import { Component, OnInit, Input} from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { SymPair } from './SymPair';

@Component({
  selector: 'app-loop-modal',
  templateUrl: './loop-modal.component.html',
  styleUrls: ['./loop-modal.component.css']
})


export class LoopModalComponent implements OnInit {
  _name: string;
  _symtoms: Array<any>;
  DisplayedSym = [];
  HaveSym = [];
  NotSym = [];
  symPair: SymPair = {
    HaveSym: [],
    NotSym: []
  };
  @Input()

  set name(value: string) {
    this._name = value;
  }
  set further_symptoms(value: any) {
    this._symtoms = value;
  }

  emitDataOutside() {
    this.DisplayedSym.forEach((d) => {
      if (d.status === 'yes') {
        this.HaveSym.push(d);
        this.symPair.HaveSym.push(d);
      } else if (d.status === 'no') {
        this.NotSym.push(d);
        this.symPair.NotSym.push(d);
      }
    });
    console.log(this.HaveSym);
    console.log(this.NotSym);
    this.subject.next(
     this.symPair
    );
  }

  handleCancel(e) {
    this.subject.destroy('onCancel');
  }
  constructor(private subject: NzModalSubject) {
    this.subject.on('onDestory', () => {
      console.log('destroy');
    });
  }

  ngOnInit() {
    console.log(this._symtoms);
    this._symtoms.forEach((d) => {
      this.DisplayedSym.push({
        name: d.Name,
        id: d.Id,
        status: 'unknown'
      });
    });
    console.log(this.DisplayedSym);
  }

}
