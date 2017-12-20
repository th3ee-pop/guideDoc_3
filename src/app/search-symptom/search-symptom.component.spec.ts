import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSymptomComponent } from './search-symptom.component';

describe('SearchSymptomComponent', () => {
  let component: SearchSymptomComponent;
  let fixture: ComponentFixture<SearchSymptomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSymptomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
