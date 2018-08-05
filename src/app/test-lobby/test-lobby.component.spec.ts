import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLobbyComponent } from './test-lobby.component';

describe('TestLobbyComponent', () => {
  let component: TestLobbyComponent;
  let fixture: ComponentFixture<TestLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
