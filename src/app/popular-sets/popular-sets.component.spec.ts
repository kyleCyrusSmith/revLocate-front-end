import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularSetsComponent } from './popular-sets.component';

describe('PopularSetsComponent', () => {
  let component: PopularSetsComponent;
  let fixture: ComponentFixture<PopularSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
