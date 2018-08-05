import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySetComponent } from './play-set.component';

describe('PlaySetComponent', () => {
  let component: PlaySetComponent;
  let fixture: ComponentFixture<PlaySetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaySetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
