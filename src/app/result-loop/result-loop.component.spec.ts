import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultLoopComponent } from './result-loop.component';

describe('ResultLoopComponent', () => {
  let component: ResultLoopComponent;
  let fixture: ComponentFixture<ResultLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultLoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
