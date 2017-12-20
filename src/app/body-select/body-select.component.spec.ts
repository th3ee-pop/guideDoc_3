import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySelectComponent } from './body-select.component';

describe('BodySelectComponent', () => {
  let component: BodySelectComponent;
  let fixture: ComponentFixture<BodySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
